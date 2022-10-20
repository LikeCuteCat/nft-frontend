import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useWalletStore = defineStore('wallet', () => {
	const installedWallet = ref<boolean>(false);

	return { installedWallet };
});
