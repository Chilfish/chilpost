<script setup lang="ts">
import type { Rules } from 'async-validator'
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'
import type { NuxtError } from '#app'
import type { User } from '~/types/user'

definePageMeta({
  title: 'Settings',
  description: 'Settings',
  middleware: ['user-only'],
})

const userStore = useUserStore()
const curUser = ref({ ...userStore.curUser } as User | null)

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
    { min: 3, max: 20, message: 'Nickname must be between 3 and 20 characters' },
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

const { pass, errorFields } = useAsyncValidator(curUser, rules)
const {
  state,
  isLoading,
  error,
  execute: updateSettings,
} = useAsyncState(
  async () => {
    if (pass.value && curUser.value)
      return useMyFetch<boolean>('/user/update', 'post', curUser.value)
  },
  null,
  { immediate: false },
)

const err = computed(() => (error.value as NuxtError)?.toJSON())

watch(state, async () => {
  if (state.value?.data && curUser.value) {
    await userStore.setCurUser(curUser.value)
    console.log('Settings saved!') // Toast needed
  }
})
</script>

<template>
  <CommonHeader>
    <h3>Settings</h3>
  </CommonHeader>

  <CommonError v-if="err" :error="err" />

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
      <label for="username">Username</label>
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

    <CommonButton
      :disabled="!pass"
      text="Save"
      :is-loading="isLoading"
      @click="updateSettings"
    />
  </form>
</template>

<style lang="scss" scoped>
@use "~/assets/settings";
</style>
