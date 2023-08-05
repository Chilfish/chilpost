<script setup lang="ts">
import type { Rules } from 'async-validator'
import { useAsyncValidator } from '@vueuse/integrations/useAsyncValidator'

definePageMeta({
  title: 'Settings',
  description: 'Settings',
})

const userStore = useUserStore()
const { ...user } = userStore.curUser
const curUser = ref(user) // deeply copy

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
  nick_name: [
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
  state, isLoading, execute: updateSettings,
} = useAsyncState(
  async () => {
    if (pass.value)
      return userStore.saveSettings(curUser.value)
  },
  false,
  { immediate: false },
)

watch(state, () => {
  if (state.value === true)
    console.log('Settings saved!')
})
</script>

<template>
  <CommonHeader>
    <h3>Settings</h3>
  </CommonHeader>

  <form>
    <div class="form-group">
      <label for="nick_name">Display Name</label>
      <input
        id="nick_name"
        v-model="curUser.nick_name"
        type="text"
        placeholder="Nickname"
      >
      <div
        v-if="errorFields?.nick_name?.length"
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
      @onClick="updateSettings"
    />
  </form>
</template>

<style lang="scss" scoped>
@use "~/assets/settings";
</style>
