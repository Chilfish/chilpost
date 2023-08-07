<script setup lang="ts">
const inputs = ref({
  email: '',
  password: '',
})

async function login() {

}
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
      <CommonButton text="Cancel" />
      <CommonButton
        text="Log in"
        @click="login"
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
