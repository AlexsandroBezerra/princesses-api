
import { TABLE_NAME } from '@constants/index'
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { dynamoDbClient } from '@libs/dynamo-db'
import { middyfy } from '@libs/lambda'

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 4

const indexPrincess: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  const page = Number(event?.queryStringParameters?.page || DEFAULT_PAGE)
  const pageSize = Number(event?.queryStringParameters?.pageSize || DEFAULT_PAGE_SIZE)

  const { Items: princesses } = await dynamoDbClient.scan({ TableName: TABLE_NAME }).promise()

  const totalPages = Math.ceil(princesses.length / pageSize)

  const initialIndex = (page - 1) * pageSize
  const finalIndex = page * pageSize

  const filteredItems = princesses.filter((_, index) => {
    return initialIndex <= index && index < finalIndex
  })

  return formatJSONResponse({
    items: filteredItems,
    page,
    pageSize,
    totalPages,
    totalItems: princesses.length
  })
}

export const main = middyfy(indexPrincess)
