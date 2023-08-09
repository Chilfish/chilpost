<script setup lang="ts">
const modalStore = useModalStore()
const userStore = useUserStore()
const {
  isLoading,
} = useAsyncState(userStore.setCurUser, null)
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

  <CommonModal>
    <component :is="modalStore.curSlot" />
  </CommonModal>
</template>

<style lang="scss" scoped>
@use '~/assets/common/layout';
</style>
