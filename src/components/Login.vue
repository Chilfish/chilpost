<script setup lang="ts">
import type { UserLogin, UserWithToken } from '~/types/user'

const inputs = reactive<UserLogin>({
  email: '',
  password: '',
})

const isConfirm = ref(false)
const isLoading = ref(false)

const userStore = useUserStore()
const modalStore = useModalStore()

const {
  data: loginData,
  error: loginError,
  execute: login,
} = useMyFetch<UserWithToken>('/auth/login', {
  method: 'post',
  body: inputs,
  manual: true,
})

const {
  data: registerData,
  execute: register,
} = useMyFetch<UserWithToken>('/auth/register', {
  method: 'post',
  body: inputs,
  manual: true,
})

function onSuccess(data?: UserWithToken) {
  if (!data)
    return
  isLoading.value = false

  const user = data.user
  userStore.setCurUser(user)
  modalStore.toggleModal()
}

watchEffect(() => {
  if (loginData.value)
    return onSuccess(loginData.value.data)

  if (registerData.value)
    return onSuccess(registerData.value.data)

  if (!isConfirm.value && loginError.value?.statusCode === 404) {
    if (confirm('User not found, register?')) {
      isLoading.value = true
      register()
    }
    isConfirm.value = true
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
        text="Log in"
        :is-loading="isLoading"
        @click="login(), isConfirm = false, isLoading = true"
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
