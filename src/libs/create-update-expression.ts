import type { FromSchema } from 'json-schema-to-ts'

import type PartialPrincess from '@functions/update-princess/schema'

export const createUpdateExpression = (partialPrincess: FromSchema<typeof PartialPrincess>) => {
  const keys = Object.keys(partialPrincess)

  const expression = keys.map((key) => `${key} = :${key}`).join(', ')

  const expressionValues = keys.reduce((accumulator, key) => {
    const formattedKey = ':' + key
    return { ...accumulator, [formattedKey]: partialPrincess[key] }
  }, {})

  return {
    UpdateExpression: 'set ' + expression,
    ExpressionAttributeValues: expressionValues
  }
}
