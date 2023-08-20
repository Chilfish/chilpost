/* eslint-disable n/prefer-global/process */

export const isClient = process.client
export const isDev = process.env.NODE_ENV === 'development'
