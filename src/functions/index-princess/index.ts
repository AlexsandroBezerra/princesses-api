import { handlerPath } from '@libs/handler-resolver'
import type { FunctionType } from '@interfaces/FunctionType'

export const indexPrincess: FunctionType = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'princesses'
      }
    }
  ]
}
