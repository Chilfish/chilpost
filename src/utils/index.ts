/* eslint-disable n/prefer-global/process */

import dayjs from 'dayjs'
import type { NuxtError } from 'nuxt/app'
import type { User, UserDetail } from '~/types'

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

export async function toggleFollow(user: User, following: User | UserDetail) {
  const isFollowing = user.status.following.includes(following.id)

  if (!isFollowing) {
    user.status.following.unshift(following.id)
    following.status.followers.unshift(user.id)
  }
  else {
    user.status.following.splice(user.status.following.indexOf(following.id), 1)
    following.status.followers.splice(following.status.followers.indexOf(user.id), 1)
  }

  following.status.follower_count = following.status.followers.length
  user.status.following_count = user.status.following.length
}

export function useErrorTitle(e: any) {
  if (e) {
    const err = e as NuxtError

    useHead({
      title: `${err.statusCode} / ${err.statusMessage}`,
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
