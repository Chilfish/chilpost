<script setup lang="ts">
const darkStore = useDarkStore()
const { searchWord } = storeToRefs(usePostStore())
const router = useRouter()
const route = useRoute()

const title = computed(() => route.path.substring(1))

function search() {
  router.push(`/search?q=${searchWord.value}`)
}

onMounted(() => {
  searchWord.value = route.query.q as string

  if (route.path === '/search') {
    if (route.query.q === undefined)
      router.replace('?q=""')
    search()
  }
})
</script>

<template>
  <header>
    <h2 class="capitalize">
      {{ title }}
    </h2>

    <label>
      <span
        class="i-tabler-search icon"
        @click="search()"
      />
      <input
        v-model="searchWord"
        type="search"
        placeholder="Search"
        @keydown.enter="search()"
      >
    </label>

    <div>
      <NuxtLink
        to="https://github.com/Chilfish/chilpost"
        external
        target="_blank"
      >
        <span class="i-tabler-brand-github icon" />
      </NuxtLink>

      <span
        class="icon"
        :class="darkStore.icon"
        @click="darkStore.toggle()"
      />
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "~/assets/index/header";
</style>
