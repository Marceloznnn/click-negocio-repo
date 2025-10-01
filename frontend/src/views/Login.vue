<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input type="text" v-model="email" placeholder="E-mail" required />
      <input type="password" v-model="password" placeholder="Senha" required />
      <button type="submit" :disabled="loading">
        {{ loading ? "Entrando..." : "Entrar" }}
      </button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function handleLogin() {
  error.value = '';
  loading.value = true;

  try {
    await userStore.login(email.value, password.value);

    // Redirecionamento baseado na role do usuário
    if (userStore.user?.role === 'ADMIN') {
      router.push('/admin');
    } else if (userStore.user?.role === 'MERCHANT') {
      router.push('/merchant');
    } else {
      router.push('/'); // USER ou qualquer outro
    }
  } catch (err) {
    error.value = err.response?.data?.error || 'Erro ao fazer login.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 3rem auto;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
button {
  padding: 0.5rem;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>
