import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLoginModal = defineStore('login', () => {
  const loginModalOpen = ref(false);

  function showLogin() {
    loginModalOpen.value = true;
  }

  function hideLogin() {
    loginModalOpen.value = false;
  }

  return {
    loginModalOpen,
    showLogin,
    hideLogin,
  };
});
