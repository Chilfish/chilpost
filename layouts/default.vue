<template>
  <div id="main">
    <slot />
  </div>

  <CommonNav />

  <aside>
    <h2>WIP</h2>
  </aside>
</template>

<style lang="scss" scoped>
@use '~/assets/variables' as *;

span {
  display: none;
}

aside {
  display: none;
  justify-content: center;
  padding: 1rem;
  transition: all 0.3s ease-in-out;
}

#main {
  width: 100%;
  margin-top: $header-height;
  margin-bottom: $nav-footer-height;
}

@media (min-width: $sm) {
  #main {
    width: stretch;
    margin-bottom: 0;
    margin-left: $nav-aside-width;
  }
}

@media (min-width: $lg) {
  aside {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 100;
    display: flex;
    width: $aside-width;
    height: 100%;

    @include border(left);
  }

  #main {
    margin-right: $aside-width;
  }
}
</style>
