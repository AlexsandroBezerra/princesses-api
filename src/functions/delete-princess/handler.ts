
import { TABLE_NAME } from '@constants/index'
import { formatJSONResponse } from '@libs/api-gateway'
import { dynamoDbClient } from '@libs/dynamo-db'
import { middyfy } from '@libs/lambda'
import { withAuth } from '@libs/with-auth'

const deletePrincess = withAuth<{}>(async (event) => {
  const princessId = event.pathParameters.princessId

  try {
    await dynamoDbClient.delete({ TableName: TABLE_NAME, Key: { princessId } }).promise()

    return formatJSONResponse('', 204)
  } catch (error) {
    console.error(error)
    return formatJSONResponse({ error: 'could not delete princess' }, 500)
  }
})

export const main = middyfy(deletePrincess)
