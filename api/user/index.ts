import type { VercelRequest, VercelResponse } from '@vercel/node'
import { fakeUsers } from '../_mock.js'

export default function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // TODO: need to paging
  res.json(fakeUsers)
}
