import type { VercelRequest, VercelResponse } from '@vercel/node'

import { toDetail } from '../_utils.js'
import { posts } from '../_mock.js'

export default function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  const postDetails = posts.map(toDetail)
  return res.json(postDetails)
}
