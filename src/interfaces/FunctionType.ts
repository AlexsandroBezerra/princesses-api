import type { AWS } from '@serverless/typescript'

export type FunctionType = Pick<AWS, 'functions'>['functions'][string]
