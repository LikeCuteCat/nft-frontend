import AppAlert from '@/components/app/AppAlert.vue';
import type { App } from 'vue';

export default {
	install(app: App) {
		app.component('AppAlert', AppAlert);
	},
};
