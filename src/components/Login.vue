<script setup lang="ts">
import type { UserLogin, UserWithToken } from '~/types/user'

const inputs = reactive<UserLogin>({
  email: '',
  password: '',
})

const isConfirm = ref(false)
const isLoading = ref(false)
const url = ref('/auth/login')

const userStore = useUserStore()
const modalStore = useModalStore()

const {
  data,
  execute,
} = useMyFetch<UserWithToken>(url, {
  method: 'post',
  body: inputs,
  manual: true,
})

function onSuccess(data: UserWithToken) {
  isLoading.value = false

  // console.log(data, 'login')
  userStore.curUser = data.user
  modalStore.close()

  // have to use setTimeout to avoid the token not being set
  setTimeout(() => {
    useCookie('token').value = data.token
  }, 0)
}

watch(data, async () => {
  if (!data.value)
    return

  if (data.value.statusCode === 200)
    return onSuccess(data.value.data!)

  if (!isConfirm.value && data.value.statusCode === 404) {
    await delay(1000)

    if (confirm('User not found, register?')) {
      isLoading.value = true
      url.value = '/auth/register'
      execute()
    }
    isConfirm.value = true
  }

  isLoading.value = false
})
</script>

<template>
  <div id="login">
    <h2>Log in your account</h2>
    <form>
      <label>
        <span class="i-tabler-mail icon" />
        <input
          v-model="inputs.email"
          type="email"
          placeholder="Email"
        >
      </label>
      <label>
        <span class="i-tabler-lock icon" />
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
        @click="modalStore.close()"
      />
      <CommonButton
        text="Log in"
        :is-loading="isLoading"
        @click="execute(), isConfirm = false, isLoading = true"
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
