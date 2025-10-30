import { createApp } from 'vue';
import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';

import { router } from '@/pages/router';

import { appStarted } from '@/shared/services/appStarted.ts';

import App from './app/App.vue';

import '@fontsource/abel/index.css';
import './app/styles/style.css';

appStarted();

const app = createApp(App);
app.use(router)
    .use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: false,
                cssLayer: {
                    name: 'primevue',
                    order: 'theme, base, primevue',
                },
            },
        },
    })
    .mount('#app');
