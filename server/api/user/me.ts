import type { VercelRequest, VercelResponse } from '@vercel/node'
import { users } from '../_mock.js'

export default function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  const curUser = users.find(user => user.name === 'chilfish') // mock
  if (!curUser)
    res.status(404).json({ message: 'User not found' })

  return res.json(curUser)
}
