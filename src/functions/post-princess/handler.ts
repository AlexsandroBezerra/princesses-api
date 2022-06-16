import { nanoid } from 'nanoid'

import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { withAuth } from '@libs/with-auth'
import { isValidDate } from '@libs/is-valid-date'
import { dynamoDbClient } from '@libs/dynamo-db'
import { TABLE_NAME } from '@constants/index'

import schema from './schema'

const postPrincess = withAuth<typeof schema>(async (event) => {
  const { title, subTitle, history, assetUrl, date } = event.body
  const princessId = nanoid()

  if (!isValidDate(date)) {
    return formatJSONResponse({ error: '"date" provided is not valid' }, 400)
  }

  const princess = { princessId, title, subTitle, history, assetUrl, date }

  try {
    await dynamoDbClient.put({ TableName: TABLE_NAME, Item: princess }).promise()
    return formatJSONResponse(princess)
  } catch (err) {
    console.error(err)
    return formatJSONResponse({ error: 'could not create princess' })
  }
})

export const main = middyfy(postPrincess)
