import dayjs from 'dayjs'
import type { ErrorType, User } from '~/types'

export const isClient = process.client
export const isDev = process.env.NODE_ENV === 'development'

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Pick random items from an array
 * @param arr the array to pick from
 * @param exclude items to exclude
 * @param count number of items to pick, default to 1
 * @returns the picked item(s)
 */
export function randomPick<T>(arr: T[], exclude: T[] = [], count = 1) {
  const filtered = arr.filter(item => !exclude.includes(item))

  if (filtered.length < count)
    return filtered

  const picked = new Set<T>()

  while (picked.size < count) {
    const index = Math.floor(Math.random() * filtered.length)
    picked.add(filtered[index])
  }

  return Array.from(picked)
}

export async function toggleFollow(user: User, target: User) {
  const targetId = target.id.toString()
  const userId = user.id.toString()

  const isFollowing = user.status.followings.includes(targetId)

  if (!isFollowing) {
    user.status.followings.unshift(targetId)
    target.status.followers.unshift(userId)
  }
  else {
    user.status.followings.splice(user.status.followings.indexOf(targetId), 1)
    target.status.followers.splice(target.status.followers.indexOf(userId), 1)
  }

  target.status.follower_count = target.status.followers.length
  user.status.following_count = user.status.followings.length
}

export function useErrorTitle(e?: any) {
  if (e) {
    const err = e as ErrorType

    useHead({
      title: `${err.statusCode} / ${err.message}`,
    })
  }
}

export function timeDiff(time: string) {
  const now = Date.now()
  const diff = dayjs(now).diff(time, 'minute')

  const isSameYear = dayjs(now).isSame(time, 'year')

  if (diff < 1)
    return 'just now'
  if (diff < 60)
    return `${diff}m`
  if (diff < 60 * 24)
    return `${Math.floor(diff / 60)}h`
  if (diff < 60 * 24 * 365 && isSameYear)
    return dayjs(time).format('MM-DD')
  return dayjs(time).format('YY-MM-DD')
}

export function fmtNum(num: number) {
  if (num < 1)
    return ''
  if (num < 1000)
    return num
  if (num < 10000)
    return `${Math.floor(num / 100) / 10}k`
  if (num < 100000)
    return `${Math.floor(num / 1000)}k`
  return '100k+'
}

export function newFormData(data: Record<string, any>) {
  const formData = new FormData()
  for (const key in data)
    formData.append(key, data[key])

  return formData
}
