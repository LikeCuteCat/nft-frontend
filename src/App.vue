<template>
	<NConfigProvider :theme="theme">
		<TheHeader />
		<!-- <NButton @click="changeTheme" type="error">Change From App</NButton> -->
		<RouterView />
		<NGlobalStyle />
	</NConfigProvider>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import { storeToRefs } from 'pinia';
import { useBrowserStore } from './stores/browser';

const { theme } = storeToRefs(useBrowserStore());
</script>

<style scoped></style>
