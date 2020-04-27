import { Entity, EntityId, CrudRepository, PrimitiveIdentifier } from 'rimo'
import { cloneDeep } from 'lodash'
import { InMemoryRepository } from './inmemory.repository'

export abstract class InMemoryCrudRepository<T extends Entity<any>, ID extends EntityId>
  implements InMemoryRepository<T, ID>, CrudRepository<T, ID> {
  readonly data: Map<PrimitiveIdentifier, T> = new Map()

  private get(id: ID): T | undefined {
    const record = this.data.get(id.toValue())
    return record && cloneDeep(record)
  }

  private set<S extends T>(entity: S) {
    this.data.set(entity.id.toValue(), cloneDeep(entity))
    return cloneDeep(entity)
  }

  async save<S extends T>(entity: S) {
    return this.set(entity)
  }

  async saveAll<S extends T>(entities: S[]) {
    return Promise.all(entities.map(this.save))
  }

  async findById(id: ID) {
    return this.get(id)
  }

  async existsById(id: ID) {
    const entity = await this.findById(id)
    return entity !== undefined
  }

  async findAll() {
    return Array.from(this.data.values()).map(cloneDeep)
  }

  async findAllById(ids: ID[]) {
    const records = await Promise.all(ids.map(this.findById))
    return records.filter((r: T | undefined): r is T => r !== undefined)
  }

  async count() {
    return this.data.size
  }

  async deleteById(id: EntityId) {
    this.data.delete(id.toValue())
  }

  async delete({ id }: T) {
    return this.deleteById(id)
  }

  async deleteAll(entities?: T[]) {
    await Promise.all(entities !== undefined ? entities.map(this.delete) : [this.data.clear()])
  }
}
