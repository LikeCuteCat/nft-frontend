import { fileURLToPath, URL } from 'url';
import Components from 'unplugin-vue-components/vite';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Components({
			dirs: ['src/components/app'],
			// dts: true, // enabled by default if `typescript` is installed
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			stream: require.resolve('stream-browserify'),
			crypto: require.resolve('crypto-browserify'),
			http: require.resolve('stream-http'),
			https: require.resolve('https-browserify'),
			electron: require.resolve('electron'),
		},
	},
	define: {
		'process.env': {},
		global: {},
	},
	server: {
		port: 3000,
	},
});
