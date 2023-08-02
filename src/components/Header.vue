<script setup lang="ts">

</script>

<template>
  <header>
    <button
      class="back"
      @click="$router.back()"
    >
      <span class="box">
        <span class="icon i-tabler-arrow-left" />
      </span>
    </button>
    <slot />
  </header>
</template>

<style lang="scss" scoped>
@import "../styles/variables";

header {
  display: flex;
  gap: 1rem;
  align-items: center;
  width: stretch;
  height: $header-height;
  padding: 0.5rem 1rem;
}
</style>
