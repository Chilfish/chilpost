import type { NitroErrorHandler } from 'nitropack'
import { consola } from 'consola'
import type { MyError } from './newError'
import { newError } from './newError'

export default <NitroErrorHandler> async function (error: MyError, event) {
  const code = (error.cause as any)?.code || error.code
  const err = newError(code, undefined, error)

  await err.handle()

  const { message, ...rest } = err

  if (err.statusCode >= 500)
    consola.error({ ...error })

  const res = event.node.res
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200

  res.end(JSON.stringify({ message, ...rest }))
}
