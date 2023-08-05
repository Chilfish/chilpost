import type { VercelRequest, VercelResponse } from '@vercel/node'
import { users } from '../../src/mock/_mock'

export default function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // TODO: need to paging
  res.json(users)
}
