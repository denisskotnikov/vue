import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';
import inspect from 'vite-plugin-inspect';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        tailwindcss(),
        Components({
            resolvers: [PrimeVueResolver()],
        }),
        inspect({
            build: true,
            outputDir: '.vite-inspect',
        }),
        vue(),
        svgr(),
        compression(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
