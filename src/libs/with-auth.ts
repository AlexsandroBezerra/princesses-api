import { APP_SECRET } from '@constants/index'
import type { ValidatedEventAPIGatewayProxyEvent } from './api-gateway'

export const withAuth = <T extends unknown = unknown>(handler: ValidatedEventAPIGatewayProxyEvent<T>): ValidatedEventAPIGatewayProxyEvent<T> => {
  return (...params) => {
    const [event] = params

    if (event?.headers?.Authorization === APP_SECRET) {
      return handler(...params)
    }

    return new Promise(resolve => resolve({
      body: JSON.stringify({ error: 'You must send the correct secret' }),
      statusCode: 403
    }))
  }
}
