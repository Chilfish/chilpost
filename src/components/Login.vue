<script setup lang="ts">
import type { UserLogin, UserWithToken } from '~/types/user'

const inputs = reactive<UserLogin>({
  email: '',
  password: '',
})

const isRegister = ref(false)

const userStore = useUserStore()
const modalStore = useModalStore()

const {
  data: loginData,
  // pending,
  error: loginError,
  execute: login,
} = useMyFetch<UserWithToken>('/auth/login', 'post', inputs, { immediate: false, watch: false })

const {
  data: registerData,
  execute: register,
} = useMyFetch<UserWithToken>('/auth/register', 'post', inputs, { immediate: false, watch: false })

function onSuccess(data?: UserWithToken) {
  if (!data)
    return
  const user = data.user
  userStore.setCurUser(user)
  modalStore.toggleModal()
}

watchEffect(async () => {
  if (loginError.value?.statusCode === 404) {
    await delay(500)
    isRegister.value = confirm('User not found, register?')

    if (isRegister.value) {
      register().then(() => {
        isRegister.value = false
        onSuccess(registerData.value?.data)
      })
    }
  }
  else {
    onSuccess(loginData.value?.data)
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
        @click="login()"
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
