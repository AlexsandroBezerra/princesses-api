import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'
import type { FromSchema } from 'json-schema-to-ts'

type ValidatedAPIGatewayProxyEvent<T> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<T> }
export type ValidatedEventAPIGatewayProxyEvent<T> = Handler<ValidatedAPIGatewayProxyEvent<T>, APIGatewayProxyResult>

export const formatJSONResponse = (response: any, statusCode = 200) => {
  return { statusCode, body: JSON.stringify(response) }
}
