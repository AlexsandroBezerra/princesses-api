import { handlerPath } from '@libs/handler-resolver'
import type { FunctionType } from '@interfaces/FunctionType'

import schema from './schema'

export const postPrincesses: FunctionType = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'princesses',
        request: {
          schemas: { 'application/json': schema }
        }
      }
    }
  ]
}
