import { DynamoDB } from 'aws-sdk'
import Container from 'typedi'

// DynamoDB is replicated across sa-east-1 and us-east-1.
// Use sa-east-1 for South America and us-east-1 for other regions.
const edgeRegion = process.env.AWS_REGION || 'us-east-1'
const dynamoDbRegion = edgeRegion.startsWith('sa') ? 'sa-east-1' : 'us-east-1'

const options = {
  region: dynamoDbRegion,
  convertEmptyValues: true
}

// TODO: configure local client?
const client = new DynamoDB.DocumentClient(options)

Container.set('dynamo.client', client)
Container.set('dynamo.tableName', process.env.DYNAMODB_TABLE)
