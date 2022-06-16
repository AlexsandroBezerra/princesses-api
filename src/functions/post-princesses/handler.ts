import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { withAuth } from '@libs/with-auth'

import schema from './schema'

const postPrincesses = withAuth<typeof schema>(async (event) => {
  return formatJSONResponse(event)
})

export const main = middyfy(postPrincesses)
