<script setup lang="ts">
const modalStore = useModalStore()

onNuxtReady(async () => {
  const userStore = useUserStore()

  // get user info from server, in SSR mode
  if (!userStore.curUser?.name)
    await userStore.fetchMe()
})
</script>

<template>
  <span class="i-tabler-moon i-tabler-sun hidden" />
  <div id="main">
    <slot />
  </div>

  <CommonNav />

  <aside>
    <h2>WIP</h2>
  </aside>

  <CommonModal v-if="modalStore.showModal">
    <component :is="modalStore.curSlot" />
  </CommonModal>
</template>

<style lang="scss" scoped>
@use '~/assets/common/layout';
</style>
