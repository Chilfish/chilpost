import type { NitroErrorHandler } from 'nitropack'
import type { MyError } from './newError'
import { newError } from './newError'

export default <NitroErrorHandler> async function (error: MyError, event) {
  const code = (error.cause as any)?.code || error.code
  const err = newError(code)
  const { message, ...rest } = err

  const res = event.node.res
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = err.statusCode

  res.end(JSON.stringify({ message, ...rest }))
}
