import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
	const address = ref<string | null>('');
	address.value = sessionStorage.getItem('addr');

	function setAddress(account: string) {
		address.value = account;
		sessionStorage.setItem('addr', account);
	}
	return { address, setAddress };
});
