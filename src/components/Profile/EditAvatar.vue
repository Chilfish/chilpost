<script setup lang="ts">
const { avatar } = defineProps({
  avatar: String,
})

const emit = defineEmits<{
  edit: [blob: Blob]
}>()

const avatarRef = ref(avatar)

function editAvatar(file?: File) {
  if (!file)
    return
  const reader = new FileReader()
  reader.readAsDataURL(file)

  const img = new Image()
  img.src = URL.createObjectURL(file)

  // crop image to 200x200px square, centering the image
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const size = Math.min(img.width, img.height)
    const x = (img.width - size) / 2
    const y = (img.height - size) / 2
    canvas.width = 200
    canvas.height = 200
    ctx.drawImage(img, x, y, size, size, 0, 0, 200, 200)
    avatarRef.value = canvas.toDataURL()

    canvas.toBlob((blob) => {
      emit('edit', blob!)
    })
  }
}
</script>

<template>
  <div class="avatar-edit">
    <input
      id="avatar-input"
      type="file"
      accept="image/*"
      class="hidden"
      @change="editAvatar(($event.target as HTMLInputElement)?.files?.[0])"
    >

    <p>Public picture</p>
    <label
      for="avatar-input"
      class="edit"
    >
      <span class="icon i-tabler-pencil" />
      <span>Edit</span>
    </label>
    <img :src="avatarRef" alt="avatar">
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/profile/edit-avatar";
</style>
