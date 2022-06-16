import { DynamoDB } from 'aws-sdk'

export const dynamoDbClient = new DynamoDB.DocumentClient()
