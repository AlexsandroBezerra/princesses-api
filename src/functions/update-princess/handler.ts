import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { withAuth } from '@libs/with-auth'
import { isValidDate } from '@libs/is-valid-date'
import { dynamoDbClient } from '@libs/dynamo-db'
import { TABLE_NAME } from '@constants/index'

import schema from './schema'

const postPrincesses = withAuth<typeof schema>(async (event) => {
  const princessId = event.pathParameters.princessId
  const partialPrincess = event.body

  if (!isValidDate(partialPrincess.date)) {
    return formatJSONResponse({ error: '"date" provided is not valid' }, 400)
  }

  try {
    const result = await dynamoDbClient.update({
      TableName: TABLE_NAME,
      Key: { princessId },
      AttributeUpdates: partialPrincess,
      ReturnValues: 'ALL_NEW'
    }).promise()

    return formatJSONResponse(result)
  } catch (err) {
    console.error(err)
    return formatJSONResponse({ error: 'could not create princess' }, 500)
  }
})

export const main = middyfy(postPrincesses)
