import { SECRET } from '@constants/index'
import type { ValidatedEventAPIGatewayProxyEvent } from './api-gateway'

export const withAuth = <T>(handler: ValidatedEventAPIGatewayProxyEvent<T>): ValidatedEventAPIGatewayProxyEvent<T> => {
  return (...params) => {
    const [event] = params

    if (event?.headers?.Authorization === SECRET) {
      return handler(...params)
    }

    return new Promise(resolve => resolve({
      body: JSON.stringify({ error: 'You must send the secret' }),
      statusCode: 403
    }))
  }
}
