<template>
	<RouterLink to="/">
		<NGradientText type="info">Home</NGradientText>
	</RouterLink>

	<section style="float: right">
		<NIcon
			v-if="user.address === ''"
			@click="showModal = true"
			class="hover-cursor"
			size="32"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 28 28"
			>
				<g fill="none">
					<path
						d="M3 5.75A2.75 2.75 0 0 1 5.75 3h13.5A2.75 2.75 0 0 1 22 5.75v1.258a3.75 3.75 0 0 1 3.5 3.742v10.5A3.75 3.75 0 0 1 21.75 25H6.754a3.75 3.75 0 0 1-3.75-3.75v-10.5H3V6h.011A2.785 2.785 0 0 1 3 5.75zm17.5 0c0-.69-.56-1.25-1.25-1.25H5.75a1.25 1.25 0 1 0 0 2.5H20.5V5.75zM18.75 16a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5z"
						fill="currentColor"
					></path>
				</g>
			</svg>
		</NIcon>
		<template v-else>
			<NDropdown trigger="click" :options="options" @select="handleSelect">
				<NIcon class="hover-cursor" size="32">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 512 512"
					>
						<path
							d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38c-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6z"
							fill="currentColor"
						></path>
						<path
							d="M432 480H80a31 31 0 0 1-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75c1.94 10.73-.68 21.34-7.18 29.11A31 31 0 0 1 432 480z"
							fill="currentColor"
						></path>
					</svg>
				</NIcon>
			</NDropdown>
			<NIcon @click="goNotificationPage" class="hover-cursor" size="32">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 512 512"
				>
					<path
						d="M440.08 341.31c-1.66-2-3.29-4-4.89-5.93c-22-26.61-35.31-42.67-35.31-118c0-39-9.33-71-27.72-95c-13.56-17.73-31.89-31.18-56.05-41.12a3 3 0 0 1-.82-.67C306.6 51.49 282.82 32 256 32s-50.59 19.49-59.28 48.56a3.13 3.13 0 0 1-.81.65c-56.38 23.21-83.78 67.74-83.78 136.14c0 75.36-13.29 91.42-35.31 118c-1.6 1.93-3.23 3.89-4.89 5.93a35.16 35.16 0 0 0-4.65 37.62c6.17 13 19.32 21.07 34.33 21.07H410.5c14.94 0 28-8.06 34.19-21a35.17 35.17 0 0 0-4.61-37.66z"
						fill="currentColor"
					></path>
					<path
						d="M256 480a80.06 80.06 0 0 0 70.44-42.13a4 4 0 0 0-3.54-5.87H189.12a4 4 0 0 0-3.55 5.87A80.06 80.06 0 0 0 256 480z"
						fill="currentColor"
					></path>
				</svg>
			</NIcon>
		</template>
	</section>

	<NModal v-model:show="showModal" preset="card" title="Connect Wallet">
		<NSpace vertical>
			<NSpace justify="center">
				<NButton @click="connectWithMetamask">
					<template #icon>
						<img class="icon-image" src="@/assets/metamask-fox@2x.png" alt="" />
					</template>
					Metamask
				</NButton>
			</NSpace>
			<NSpace justify="center">
				<NButton @click="connectWithKaikas">
					<template #icon>
						<img class="icon-image" src="@/assets/kaikas@2x.png" alt="" />
					</template>
					Kaikas
				</NButton>
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
import { useRouter } from 'vue-router';

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
	const message = `Connect Metamask to this website`;
	await ethereum.request({
		method: 'personal_sign',
		params: [message, account],
	});
	user.setAddress(account);
	showModal.value = false;
};

const connectWithKaikas = async () => {
	const klaytn = window.klaytn;
	const caver = new Caver(klaytn);
	if (typeof window.klaytn !== 'undefined') {
		const accounts = await klaytn.enable();
		const account = accounts[0];
		const message = `Connect Kaikas to this website`;
		await caver.klay.sign(message, account);
		user.setAddress(account);
		showModal.value = false;
	}
};

const logout = () => {
	user.setAddress('');
};
// console.log(`address = ${address}`);

const options = [
	{
		label: 'My',
		key: 'my',
	},
	{
		label: 'Change Mode',
		key: 'changeMode',
	},
	{
		label: 'Logout',
		key: 'logout',
	},
];
const handleSelect = (input: string) => {
	if (input === 'logout') logout();
	if (input === 'changeMode') changeMode();
};

const router = useRouter();
const goNotificationPage = () => {
	router.push({
		name: 'notification',
	});
};
</script>

<style scoped>
.hover-cursor:hover {
	cursor: pointer;
}

.icon-image {
	width: 20px;
}
</style>
