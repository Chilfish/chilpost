import type { NitroErrorHandler } from 'nitropack'

export default <NitroErrorHandler> async function (error, event) {
  const res = event.node.res
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = error.statusCode

  res.end(JSON.stringify(error))
}
