import type { AWS } from '@serverless/typescript'

import * as functions from '@functions/index'
import { TABLE_NAME } from '@constants/index'

const serverlessConfiguration: AWS = {
  service: 'princess-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem'
            ],
            Resource: [
              {
                'Fn::GetAtt': [
                  'PrincessesTable',
                  'Arn'
                ]
              }
            ]
          }
        ]
      }
    }
  },
  functions: { ...functions },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10
    }
  },
  resources: {
    Resources: {
      PrincessesTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: 'princessId',
              AttributeType: 'S'
            }
          ],
          KeySchema: [
            {
              AttributeName: 'princessId',
              KeyType: 'HASH'
            }
          ],
          BillingMode: 'PAY_PER_REQUEST',
          TableName: TABLE_NAME
        }
      }
    }
  }
}

module.exports = serverlessConfiguration
