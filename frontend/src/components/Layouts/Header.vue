<template>
  <header class="header">
    <div class="container">
      <!-- Logo -->
      <router-link to="/" class="logo">
        <img src="/logo.svg" alt="ClickNegocio Logo" class="logo-img" />
      </router-link>

      <!-- Navegação central -->
      <nav class="nav-center">
        <router-link to="/">Home</router-link>
        <router-link to="/jobs">Pesquisar Emprego</router-link>
        <router-link to="/categories">Categorias</router-link>
        <router-link to="/contact">Contato</router-link>
      </nav>

      <!-- Lado direito -->
      <nav class="nav-right">
        <!-- Se não logado -->
        <router-link
          v-if="!isLoggedIn"
          to="/login"
          class="nav-link"
        >
          Login
        </router-link>
        <router-link
          v-if="!isLoggedIn"
          to="/register"
          class="nav-link"
        >
          Criar Conta
        </router-link>

        <!-- Perfil como logout -->
        <button
          v-if="isLoggedIn"
          class="nav-link"
          @click="handleLogout"
        >
          Perfil
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '../../stores/userStore';

const userStore = useUserStore();

// Computed para detectar login
const isLoggedIn = computed(() => userStore.isLoggedIn());

// Logout ao clicar
function handleLogout() {
  userStore.logout();
}
</script>

<style scoped>
/* HEADER */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 1rem 2rem;
  z-index: 1000;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  justify-content: center;
}

/* CONTAINER */
.container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* LOGO */
.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  width: 70px;  /* ajuste conforme necessário */
  height: auto;
}

/* NAV CENTRAL */
.nav-center {
  display: flex;
  gap: 2rem;
}

.nav-center a {
  color: black;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s, transform 0.2s;
}

.nav-center a:hover {
  color: #28a745;
  transform: translateY(-2px);
}

/* NAV DIREITA */
.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* LINKS LADO DIREITO */
.nav-link {
  background: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
  border: none;
  cursor: pointer;
}

.nav-link:hover {
  background: #218838;
  transform: translateY(-2px);
}
</style>
