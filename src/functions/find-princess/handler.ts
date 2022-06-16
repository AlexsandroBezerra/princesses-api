
import { TABLE_NAME } from '@constants/index'
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { dynamoDbClient } from '@libs/dynamo-db'
import { middyfy } from '@libs/lambda'

const findPrincesses: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  const princessId = event.pathParameters.princessId

  try {
    const { Item } = await dynamoDbClient.get({ TableName: TABLE_NAME, Key: { princessId } }).promise()

    if (Item) {
      return formatJSONResponse(Item)
    }

    return formatJSONResponse({ error: 'princess not found' }, 404)
  } catch (error) {
    console.log(error)
    return formatJSONResponse({ error: 'could not retrieve princess' }, 500)
  }
}

export const main = middyfy(findPrincesses)
