<template>
  <div id="main">
    <RouterView />
  </div>
  <Nav />
  <aside />
</template>

<style lang="scss" scoped>
@import './styles/variables';

aside {
  display: none;
  transition: all 0.3s ease-in-out;
}

#main {
  width: 100%;
}

@media (min-width: $sm) {
  #main {
    width: stretch;
    margin-left: $nav-aside-width;
  }
}

@media (min-width: $lg) {
  aside {
    display: flex;
    width: $aside-width;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 100;

    @include border(left);
  }

  #main {
    margin-right: $aside-width;
  }
}
</style>
