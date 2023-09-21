<script setup lang="ts">
import type { NuxtError } from '#app'
import type { UserLogin, UserWithToken } from '~/types/user'

const inputs = reactive<UserLogin>({
  email: '',
  password: '',
})

const isRegister = ref(false)

const userStore = useUserStore()
const modalStore = useModalStore()

const {
  isLoading,
  error,
  execute,
} = useAsyncState(
  async () => {
    const { ...data } = inputs // remove the reactivity

    if (isRegister.value)
      return await useMyFetch<UserWithToken>('/auth/register', 'post', data)

    return await useMyFetch<UserWithToken>('/auth/login', 'post', data)
  },
  null,
  {
    immediate: false,
    onSuccess(res) {
      const user = res?.data.user

      userStore.setCurUser(user!)
      modalStore.toggleModal()
    },
  },
)

const err = computed(() => (error.value as NuxtError)?.toJSON())

watchEffect(async () => {
  if (err.value?.statusCode === 404) {
    await delay(500)
    isRegister.value = confirm('User not found, register?')
    if (isRegister.value) {
      execute()
      isRegister.value = false
    }
  }
})
</script>

<template>
  <div id="login">
    <h2>Log in your account</h2>
    <form>
      <label>
        <span class="icon i-tabler-mail" />
        <input
          v-model="inputs.email"
          type="email"
          placeholder="Email"
        >
      </label>
      <label>
        <span class="icon i-tabler-lock" />
        <input
          v-model="inputs.password"
          type="password"
          placeholder="Password"
        >
      </label>
    </form>

    <div class="actions">
      <CommonButton
        text="Cancel"
        @click="modalStore.toggleModal()"
      />
      <CommonButton
        :is-loading="isLoading"
        text="Log in"
        @click="execute()"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#login {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  text-align: center;

  &>* {
    width: 100%;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;

  label {
    width: 100%;
  }

  input {
    width: 80%;
    height: 3rem;
    margin-left: 0.8rem;
    font-size: 1rem;
    background-color: var(--gray);
    border-radius: 0.5rem;
  }
}

.actions {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}
</style>
