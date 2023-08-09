<script setup lang="ts">
const userStore = useUserStore()
</script>

<template>
  <div>
    <CommonButton
      text="Set Cur User"
      @click="userStore.setCurUser()"
    />
    <CommonButton
      text="Log out"
      @click="userStore.logout()"
    />
    {{ userStore.curUser }}
  </div>
</template>
