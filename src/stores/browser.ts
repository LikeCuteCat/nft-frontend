import { darkTheme, type GlobalTheme } from 'naive-ui';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBrowserStore = defineStore('browser', () => {
	const theme = ref<GlobalTheme | null>(darkTheme);
	if (
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	) {
		// dark mode
		theme.value = darkTheme;
	} else {
		theme.value = null;
	}
	function changeTheme() {
		theme.value === null ? (theme.value = darkTheme) : (theme.value = null);
	}

	return { theme, changeTheme };
});
