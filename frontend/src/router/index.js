// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

// Views
import Home from "../views/public/Home.vue";
import Login from "../views/Login.vue";
import Admin from "../views/admin/Admin.vue";
import Merchant from "../views/merchant/Merchant.vue";
import Register from "../views/Register.vue";
import RegisterMerchant from "../views/RegisterMerchant.vue";

const routes = [
  { path: "/", component: Home },

  // 🔹 Rotas abertas apenas para visitantes
  { path: "/login", component: Login, meta: { guestOnly: true } },
  { path: "/register", component: Register, meta: { guestOnly: true } }, // usuário comum
  { path: "/register-merchant", component: RegisterMerchant, meta: { guestOnly: true } }, // vendedor

  // 🔹 Rotas privadas
  { path: "/admin", component: Admin, meta: { requiresAuth: true, role: "ADMIN" } },
  { path: "/merchant", component: Merchant, meta: { requiresAuth: true, role: "MERCHANT" } },

  // fallback
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ====================
// 🔹 Middleware Global
// ====================
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("accessToken"); // 🔹 Corrigido
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // 1) Bloqueia rotas privadas se não estiver logado
  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  // 2) Impede usuário logado de acessar login/register
  if (to.meta.guestOnly && token) {
    return next("/");
  }

  // 3) Se a rota exige role específica, valida
  if (to.meta.role && user) {
    if (user.role !== to.meta.role) {
      return next("/"); // poderia redirecionar para /403
    }
  }

  return next();
});

export default router;
