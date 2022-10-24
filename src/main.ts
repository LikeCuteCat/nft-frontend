import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import naive from 'naive-ui';

import globalComponents from './plugins/global-components';

const app = createApp(App);

app.use(createPinia());
app.use(naive);
app.use(router);
app.use(globalComponents);

app.mount('#app');
