<!-- src/views/Register.vue -->
<template>
  <div class="auth-container">
    <h1>Registrar</h1>
    <form @submit.prevent="handleRegister">
      <input
        type="text"
        v-model="fullName"
        placeholder="Nome completo"
        required
      />
      <input type="email" v-model="email" placeholder="E-mail" required />
      <input type="password" v-model="password" placeholder="Senha" required />

      <button type="submit" :disabled="loading">
        {{ loading ? "Registrando..." : "Registrar" }}
      </button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const fullName = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
const success = ref("");
const loading = ref(false);

const router = useRouter();

async function handleRegister() {
  error.value = "";
  success.value = "";
  loading.value = true;

  try {
    await axios.post(`${API_URL}/auth/register`, {
      fullName: fullName.value,
      email: email.value,
      password: password.value,
      role: "USER", // Registro sempre como USER
    });

    success.value = "✅ Registro realizado com sucesso!";
    setTimeout(() => router.push("/login"), 1500);
  } catch (err) {
    error.value =
      err.response?.data?.error || "Erro ao registrar. Tente novamente.";
    console.error(err.response?.data || err);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.auth-container h1 {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.8rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border 0.2s;
}

input:focus {
  border-color: #28a745;
  outline: none;
}

button {
  padding: 0.8rem 1rem;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover:enabled {
  background-color: #218838;
}

button:disabled {
  background-color: #a0c4ff;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 1rem;
}

.success {
  color: green;
  margin-top: 1rem;
}
</style>
