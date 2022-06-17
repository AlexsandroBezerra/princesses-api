import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { withAuth } from '@libs/with-auth'
import { isValidDate } from '@libs/is-valid-date'
import { dynamoDbClient } from '@libs/dynamo-db'
import { TABLE_NAME } from '@constants/index'
import { createUpdateExpression } from '@libs/create-update-expression'

import schema from './schema'

const updatePrincess = withAuth<typeof schema>(async (event) => {
  const princessId = event.pathParameters.princessId

  const { Item: princessExits } = await dynamoDbClient.get({ TableName: TABLE_NAME, Key: { princessId } }).promise()

  if (!princessExits) {
    return formatJSONResponse({ error: 'princess do not exists in database' }, 400)
  }

  const partialPrincess = event.body

  if (partialPrincess.postedDate && !isValidDate(partialPrincess.postedDate)) {
    return formatJSONResponse({ error: '"postedDate" provided is not valid' }, 400)
  }

  const { ExpressionAttributeValues, UpdateExpression } = createUpdateExpression(partialPrincess)

  try {
    const { Attributes } = await dynamoDbClient.update({
      TableName: TABLE_NAME,
      Key: { princessId },
      UpdateExpression,
      ExpressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    }).promise()

    return formatJSONResponse(Attributes)
  } catch (err) {
    console.error(err)
    return formatJSONResponse({ error: 'could not update princess' }, 500)
  }
})

export const main = middyfy(updatePrincess)
