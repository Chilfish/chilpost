export async function postDelete(postId: string, parentId?: string) {
  const { data } = await useMyFetch<boolean>('/post/delete', {
    method: 'POST',
    body: {
      id: postId,
      parent_id: parentId ?? null,
    },
  })

  const isDelete = data.value?.data ?? false
  const postStore = usePostStore()
  if (isDelete)
    postStore.rmPost(postId)

  return isDelete
}
