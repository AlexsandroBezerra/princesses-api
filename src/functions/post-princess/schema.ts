export default {
  type: 'object',
  properties: {
    title: { type: 'string' },
    subTitle: { type: 'string' },
    history: { type: 'string' },
    assetUrl: { type: 'string' },
    postedDate: { type: 'string' }
  },
  additionalProperties: false,
  required: ['title', 'subTitle', 'history', 'assetUrl', 'postedDate']
} as const
