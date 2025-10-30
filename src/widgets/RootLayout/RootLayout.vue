<script setup lang="ts">
import { MainFooter, MainHeader } from './ui';
</script>

<template>
    <div class="app">
        <MainHeader class="header" />
        <main class="main">
            <slot />
        </main>
        <MainFooter class="footer" />
    </div>
</template>
<style scoped>
.app {
    display: grid;
    grid-template: 'h h h h' auto 'm m m m' 1fr 'f f f f' auto / auto 1fr auto;
    min-height: 100vh;
}

.header {
    grid-area: h;
}

.main {
    grid-area: m;
}

.footer {
    grid-area: f;
}
</style>
