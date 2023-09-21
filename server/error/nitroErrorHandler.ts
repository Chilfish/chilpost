import type { NitroErrorHandler } from 'nitropack'
import { MyError } from './newError'

export default <NitroErrorHandler> async function (error: MyError, event) {
  const err = new MyError(error)

  const res = event.node.res
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = err.statusCode

  res.end(JSON.stringify(err))
}
