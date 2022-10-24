import type { Provider } from '@/types/wallet';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useWalletStore = defineStore('wallet', () => {
	const installedWallet = ref<boolean>(false);
	const provider = ref<Provider>();
	const account = ref('');

	function setProvider(_type: Provider): void {
		provider.value = _type;
	}

	function setAccount(_account: string): void {
		account.value = _account;
	}

	return { installedWallet, provider, account, setProvider, setAccount };
});
