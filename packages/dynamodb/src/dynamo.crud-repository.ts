import { Inject } from 'typedi'
import { Entity, EntityId, CrudRepository } from 'rimo'
import { DynamoDB } from 'aws-sdk'
import { DynamoRepository } from './dynamo.repository'
import { Class } from 'type-fest'

type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }

const getAttrName = (attrNumber: number) => `#attr${attrNumber}`
const getAttrValue = (attrNumber: number) => `:attr${attrNumber}`

export abstract class DynamoCrudRepository<T extends Entity<any>, ID extends EntityId>
  implements DynamoRepository<T, ID>, CrudRepository<T, ID> {
  @Inject('dynamo.client')
  documentClient: DynamoDB.DocumentClient

  @Inject('dynamo.tableName')
  tableName: string

  constructor(private readonly Clazz: Class<T>) {}

  abstract getPK(entity: DeepPartial<T>): string
  abstract getSK(entity: DeepPartial<T>): string
  abstract getGSI_SK(entity: DeepPartial<T>): string

  getKey = (entity: DeepPartial<T>) => {
    return {
      PK: this.getPK(entity),
      SK: this.getSK(entity)
    }
  }

  toEntity = (value: object): T => {
    if (!value) {
      return undefined
    }

    const EntityClass = this.Clazz

    const entity = new EntityClass({}, new EntityId(value['id']))
    entity.populate(value)
    return entity
  }

  getUpdateExpression = <S extends T>(entity: S) => {
    const Key = this.getKey(entity)
    const ExpressionAttributeNames = {}
    const ExpressionAttributeValues = {
      ':id': entity.id.toValue(),
      ':GSI_SK': this.getGSI_SK(entity)
    }

    let attrNumber = 0
    let UpdateExpression = 'SET id = :id, GSI_SK = :GSI_SK'
    for (let [key, value] of Object.entries(entity.props)) {
      const attrName = getAttrName(attrNumber)
      const attrValue = getAttrValue(attrNumber)
      ExpressionAttributeNames[attrName] = key
      ExpressionAttributeValues[attrValue] = value || ''
      UpdateExpression += `, ${attrName} = ${attrValue}`
      attrNumber++
    }

    return {
      TableName: this.tableName,
      Key,
      UpdateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues
    }
  }

  async save<S extends T>(entity: S) {
    await this.documentClient.update(this.getUpdateExpression(entity)).promise()
    return entity
  }

  async saveAll<S extends T>(entities: S[]) {
    const TransactItems = entities.map((e) => ({ Update: this.getUpdateExpression(e) }))
    await this.documentClient.transactWrite({ TransactItems }).promise()
    return entities
  }

  async findById(id: ID) {
    const { Item } = await this.documentClient
      .get({
        TableName: this.tableName,
        Key: this.getKey({ id })
      })
      .promise()

    return this.toEntity(Item)
  }

  async existsById(id: ID) {
    const entity = await this.findById(id)
    return entity !== undefined
  }

  async findAll() {
    const results = await this.documentClient
      .query({
        TableName: this.tableName,
        KeyConditionExpression: 'SK = :SK',
        IndexName: 'GSI_1',
        ExpressionAttributeValues: {
          ':SK': this.getSK({})
        }
      })
      .promise()

    return results.Items.map(this.toEntity)
  }

  async findAllById(ids: ID[]) {
    const records = await Promise.all(ids.map(this.findById))
    return records.filter((r: T | undefined): r is T => r !== undefined)
  }

  async count() {
    return 0
  }

  async deleteById(id: EntityId) {}

  async delete({ id }: T) {}

  async deleteAll(entities?: T[]) {}
}
