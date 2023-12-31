<script setup lang="ts">
import type { Rules } from 'async-validator'
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import { Toast } from '~/components'
import type { UpdatedUser, User } from '~/types/user'
import { appName } from '~/constants'

definePageMeta({
  title: 'Settings',
  description: 'Settings',
  middleware: ['user-only'],
})

useHead({
  title: `${appName} Settings`,
})

const userStore = useUserStore()
const curUser = shallowRef(structuredClone(toRaw(userStore.curUser)) as User)
const formData = ref<FormData | null>()

const isLoading = ref(false)

const maxBio = 160

const rules: Rules = {
  name: [
    { required: true, message: 'Username is required' },
    { min: 3, max: 20, message: 'Username must be between 3 and 20 characters' },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: 'Username must be alphanumeric',
    },
  ],
  nickname: [
    { required: true, message: 'Nickname is required' },
    { min: 2, max: 20, message: 'Nickname must be between 2 and 20 characters' },
  ],
  email: [
    { required: true, message: 'Email is required' },
    { type: 'email', message: 'Please enter a valid email address' },
  ],
  bio: [
    { required: true, message: 'Bio is required' },
    { min: 1, max: maxBio, message: `Bio must be between 1 and ${maxBio} characters` },
  ],
}

const updatedUser = computed<UpdatedUser>(() => {
  const { id, name, nickname, email, bio } = curUser.value
  return { id, name, nickname, email, bio }
})

const { pass, errorFields } = useAsyncValidator(curUser, rules)
const {
  data,
  error,
  execute,
} = useMyFetch<boolean>('/user/update', {
  method: 'post',
  body: updatedUser,
  manual: true,
})

const {
  data: avatarUrl,
  execute: uploadAvatar,
} = useMyFetch<string>('/user/update/avatar', {
  method: 'post',
  body: formData,
  manual: true,
})

async function updateSettings() {
  if (!pass.value || !curUser.value)
    return

  const isSame = isEqual(curUser.value, userStore.curUser)

  isLoading.value = true
  await Promise.all([
    !isSame && execute(),
    formData.value?.get('avatar') && uploadAvatar(),
  ])
  isLoading.value = false
}

watch([data, avatarUrl], async () => {
  if (data.value?.data) {
    userStore.curUser = curUser.value
    Toast({ message: 'Settings updated!', type: 'success' })
  }

  if (avatarUrl.value?.data) {
    userStore.curUser!.avatar = avatarUrl.value.data
    Toast({ message: 'Avatar updated!', type: 'success' })
  }
})
</script>

<template>
  <CommonHeader>
    <h3>Settings</h3>
  </CommonHeader>

  <CommonError v-if="error" :error="error.data" />

  <form v-if="curUser">
    <div class="form-group">
      <label for="nickname">Display Name</label>
      <input
        id="nickname"
        v-model="curUser.nickname"
        type="text"
        placeholder="Nickname"
      >
      <div
        v-if="errorFields?.nickname?.length"
        text-red
      >
        {{ errorFields.nickname[0].message }}
      </div>
    </div>

    <div class="form-group">
      <label for="username">
        <span>Username</span>
        <span class="ml-2 text-3 text-gray-5">(Relogin needed)</span>
      </label>
      <input
        id="username"
        v-model="curUser.name"
        type="text"
        placeholder="Username"
      >
      <div
        v-if="errorFields?.name?.length"
        text-red
      >
        {{ errorFields.name[0].message }}
      </div>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="curUser.email"
        type="email"
        placeholder="Email"
      >
      <div
        v-if="errorFields?.email?.length"
        text-red
      >
        {{ errorFields.email[0].message }}
      </div>
    </div>

    <div class="form-group">
      <label for="bio">Bio</label>
      <textarea
        id="bio"
        v-model="curUser.bio"
        placeholder="Bio"
      />
      <div
        v-if="errorFields?.bio?.length"
        text-red
      >
        {{ errorFields.bio[0].message }}
      </div>
      <div class="len-count">
        {{ curUser.bio.length }} / {{ maxBio }}
      </div>
    </div>

    <ProfileEditAvatar
      :avatar="curUser.avatar"
      @edit="formData = newFormData({ avatar: $event })"
    />

    <div class="mt-4 flex gap-4">
      <CommonButton
        :disabled="!pass"
        text="Save"
        :is-loading="isLoading"
        @click="updateSettings"
      />

      <CommonButton
        text="Logout"
        level="danger"
        @click="userStore.logout"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>
@use "~/assets/settings";
</style>
