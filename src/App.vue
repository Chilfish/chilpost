<template>
  <div id="main">
    <RouterView />
  </div>
  <Nav />
</template>

<style lang="scss" scoped>
@import './styles/variables';

@media (min-width: $smd) {
  #main {
    width: stretch;
    margin-left: $aside-width;
  }
}
</style>
