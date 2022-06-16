import { handlerPath } from '@libs/handler-resolver'
import type { FunctionType } from '@interfaces/FunctionType'

import schema from './schema'

export const updatePrincess: FunctionType = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'put',
        path: 'princesses/{princessId}',
        request: {
          schemas: { 'application/json': schema }
        }
      }
    }
  ]
}
