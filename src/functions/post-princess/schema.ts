export default {
  type: 'object',
  properties: {
    title: { type: 'string' },
    subTitle: { type: 'string' },
    history: { type: 'string' },
    assetUrl: { type: 'string' },
    date: { type: 'string' }
  },
  required: ['title', 'subTitle', 'history', 'assetUrl', 'date']
} as const
