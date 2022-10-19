<template>
	<div>Header</div>
	<NButton @click="changeMode" type="info"> Change Mode </NButton>
</template>

<script setup lang="ts">
import { useBrowserStore } from '@/stores/browser';

const browserStore = useBrowserStore();
const changeMode = () => {
	browserStore.changeTheme();
};
</script>

<style scoped></style>
