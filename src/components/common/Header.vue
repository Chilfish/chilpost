<script setup lang="ts">

</script>

<template>
  <header class="blur-bg">
    <button
      class="back"
      @click="$router.back()"
    >
      <span class="box">
        <span class="i-tabler-arrow-left icon" />
      </span>
    </button>
    <slot />
  </header>
</template>

<style lang="scss" scoped>
@use "~/assets/variables"as *;

header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  gap: 1rem;
  align-items: center;
  width: stretch;
  height: $header-height;
  padding: 0.5rem 1rem;
  user-select: none;
}

@media (min-width: $sm) {
  header {
    padding-left: $nav-aside-width + 1rem;
  }
}

@media (min-width: $lg) {
  header {
    margin-right: $aside-width;
  }
}
</style>
