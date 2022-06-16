import { handlerPath } from '@libs/handler-resolver'
import type { FunctionType } from '@interfaces/FunctionType'

export const deletePrincess: FunctionType = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'princesses/{princessId}'
      }
    }
  ]
}
