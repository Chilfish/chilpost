<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { computed } from 'vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const darkStyle = computed(() => isDark.value
  ? {
      navBg: '#151515CC',
      icon: 'i-carbon-sun',
    }
  : {
      navBg: '#E7E7E7CC',
      icon: 'i-carbon-moon',
    },
)
</script>

<template>
  <nav :style="{ backgroundColor: darkStyle.navBg }">
    <div>
      <img class="logo" src="/favicon.ico">
      <span>Chill Post</span>
    </div>

    <span :class="darkStyle.icon" @click="toggleDark()" />
  </nav>
  <RouterView />
  <footer>
    <nav :style="{ backgroundColor: darkStyle.navBg }">
      <router-link
        class="i-carbon-home"
        to="/"
      />
      <router-link
        class="i-carbon-user"
        to="/@Chilfish"
      />
    </nav>
  </footer>
</template>

<style lang="scss" scoped>
nav {
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  position: sticky;
  top: 0;
  backdrop-filter: blur(24px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img.logo {
    padding: 0.3rem;
    margin-right: 1rem;
    height: 100%;
    border-radius: 12px;
  }
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3rem;
  backdrop-filter: blur(24px);
  z-index: 999;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  a {
    width: 30rem;
    height: 60%;
    text-align: center;
    line-height: 3rem;
    font-size: 1.1rem;
    font-weight: bold;
  }
}
</style>
