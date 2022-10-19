<template>
	<div>
		<h1>Home</h1>
		<NButton @click="checkMode" type="primary">Check Mode</NButton>
	</div>
</template>

<script setup lang="ts">
function checkMode() {
	if (
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	) {
		// dark mode
		alert('dark mode');
	} else {
		alert('light mode');
	}
}
</script>

<style scoped></style>
