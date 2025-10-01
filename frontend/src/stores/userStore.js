import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useUserStore = defineStore('user', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null);
  const accessToken = ref(localStorage.getItem('accessToken') || null);
  const router = useRouter();
  const loading = ref(false);

  const isLoggedIn = () => !!accessToken.value;

  function setUser(data) {
    user.value = data.user;
    accessToken.value = data.accessToken;
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('accessToken', data.accessToken);
    if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
  }

  async function login(email, password) {
    loading.value = true;
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      setUser(res.data);
    } catch (err) {
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    user.value = null;
    accessToken.value = null;
    router.push('/login');
  }

  return { user, accessToken, isLoggedIn, setUser, login, logout, loading };
});
