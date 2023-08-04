<script setup lang="ts">
import { useAsyncState, useTitle } from '@vueuse/core'
import { ref, watch } from 'vue'
import { useUserStore } from '~/store/userStore'
import type { User } from '~/types'

useTitle('Settings')

const userStore = useUserStore()

const curUser = ref<User>(userStore.curUser)

const {
  state, isLoading, execute: updateSettings,
} = useAsyncState(
  async () => userStore.saveSettings(curUser.value),
  false,
  { immediate: false },
)

watch(state, () => {
  if (state.value === true)
    console.log('Settings saved!')
})
</script>

<template>
  <Header>
    <h3>Settings</h3>
  </Header>

  <form>
    <div class="form-group">
      <label for="username">Display Name</label>
      <input
        id="nickname"
        v-model="curUser.nick_name"
        type="text"
        placeholder="Nickname"
      >
    </div>

    <div class="form-group">
      <label for="username">Username</label>
      <input
        id="username"
        v-model="curUser.name"
        type="text"
        placeholder="Username"
      >
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="curUser.email"
        type="email"
        placeholder="Email"
      >
    </div>

    <div class="form-group">
      <label for="bio">Bio</label>
      <textarea
        id="bio"
        v-model="curUser.bio"
        placeholder="Bio"
      />
    </div>

    <Button
      text="Save"
      :is-loading="isLoading"
      @onClick="updateSettings"
    />
  </form>
</template>

<style lang="scss" scoped>
@import "~/styles/settings";
</style>
