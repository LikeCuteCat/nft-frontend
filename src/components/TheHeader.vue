<template>
	<RouterLink to="/">
		<NGradientText type="info">Home</NGradientText>
	</RouterLink>

	<section style="float: right">
		<NButton @click="changeMode" type="default"> Change Mode </NButton>
		<NButton v-if="user.address === ''" @click="showModal = true" type="info">
			Connect Wallet
		</NButton>
		<NButton v-else @click="logout" type="info">
			{{ user.address }}
		</NButton>
	</section>

	<NModal v-model:show="showModal" preset="card" title="Connect Wallet">
		<NSpace vertical>
			<NSpace justify="center">
				<NButton @click="connectWithMetamask">Metamask</NButton>
			</NSpace>
			<NSpace justify="center">
				<NButton @click="connectWithKaikas">Kaikas</NButton>
			</NSpace>
		</NSpace>
	</NModal>
</template>

<script setup lang="ts">
import Caver from 'caver-js';
import { useBrowserStore } from '@/stores/browser';
import { ref } from 'vue';
import detectEthereumProvider from '@metamask/detect-provider';
import { useUserStore } from '@/stores/user';

const browserStore = useBrowserStore();
const changeMode = () => {
	browserStore.changeTheme();
};

const showModal = ref(false);
const user = useUserStore();
const connectWithMetamask = async () => {
	const ethereum: any = await detectEthereumProvider();
	const accounts = await ethereum.request({
		method: 'eth_requestAccounts',
	});
	const account = accounts[0];
	const message = `Connect wallet to this website`;
	const signature = await ethereum.request({
		method: 'personal_sign',
		params: [message, account],
	});
	user.setAddress(account);
	showModal.value = false;
};

const connectWithKaikas = async () => {};

const logout = () => {
	user.setAddress('');
};
// console.log(`address = ${address}`);
</script>

<style scoped></style>
