<!-- src/views/RegisterMerchant.vue -->
<template>
  <div class="register">
    <h1>Registrar Vendedor</h1>
    <p class="subtitle">Preencha os dados abaixo para criar sua conta como empreendedor.</p>

    <form @submit.prevent="handleRegister">
      <input type="text" v-model="fullName" placeholder="Nome completo" required />
      <input type="email" v-model="email" placeholder="E-mail profissional" required />
      <input type="password" v-model="password" placeholder="Senha" required />
      
      <button type="submit" :disabled="loading">
        {{ loading ? "Registrando..." : "Registrar como Vendedor" }}
      </button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
    <p class="info">Após o registro, você poderá gerenciar seus produtos e pedidos na plataforma.</p>
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
      role: "MERCHANT", // 🔹 define o role como MERCHANT
    });

    success.value = "✅ Vendedor registrado com sucesso!";
    setTimeout(() => {
      router.push("/merchant");
    }, 1500);
  } catch (err) {
    // detalhar erro retornado do backend
    error.value =
      err.response?.data?.error || "Erro ao registrar. Tente novamente.";
    console.error(err.response?.data || err);
  } finally {
    loading.value = false;
  }
}
</script>
