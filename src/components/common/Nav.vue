<script setup lang="ts">

</script>

<template>
  <nav class="blur-bg">
    <div>
      <img class="logo" src="/favicon.ico">
      <h1>Chill Post</h1>
    </div>
    <router-link to="/">
      <span class="icon i-tabler-home-2" />
      <p>Explore</p>
    </router-link>

    <router-link to="/@Chilfish">
      <span class="icon i-tabler-user" />
      <p>Profile</p>
    </router-link>
  </nav>
</template>

<style lang="scss" scoped>
@import '~/styles/variables';

nav {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: flex;
  gap: 5rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: $nav-footer-height;
  padding: 0.5rem 1rem;
  transition: transform 0.3s ease-in-out;
  transform: translateY(0);

  div {
    display: none;
  }
}

nav a {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 100%;
  padding: 0.2rem;
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 3rem;
  border-radius: 12px;

  p {
    display: none;
  }

  span.icon {
    width: 3rem;
    height: 3rem;
  }
}

@media (min-width: $sm) {
  nav {
    flex-direction: column;
    gap: 0.5rem;
    justify-content: start;
    width: $nav-aside-width;
    height: 100%;
    padding: 1rem;

    @include border(right);

    div {
      display: flex;
      gap: 0.4rem;
      align-items: center;
      width: 100%;
      height: 3rem;
    }

    h1 {
      font-size: 1.2rem;
      background: linear-gradient(-45deg, #5481b8 30%, #88abd0);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    img.logo {
      height: 100%;
      padding: 0.3rem;
      border-radius: 12px;
    }
  }

  nav a {
    justify-content: start;
    width: 100%;
    height: 3rem;

    &:hover {
      background: var(--hover);
    }

    span {
      width: 2rem;
      height: 1.5rem;
    }

    p {
      display: inline-block;
      margin-left: 0.5rem;
      font-size: 1rem;
    }
  }
}
</style>
