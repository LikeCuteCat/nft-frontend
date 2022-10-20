import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
	const address = ref('');

	function setAddress(account: string) {
		address.value = account;
	}
	return { address, setAddress };
});
