<script setup lang="ts">
import { Toast } from '@cpa/Toast'

const userStore = useUserStore()
</script>

<template>
  <div>
    <CommonButton
      text="Set Cur User"
      @click="userStore.me()"
    />
    <CommonButton
      text="Log out"
      @click="userStore.logout()"
    />
    {{ userStore.curUser }}
  </div>

  <button
    @click="Toast({ message: 'hello', type: 'success' })"
  >
    Toast me
  </button>
</template>
