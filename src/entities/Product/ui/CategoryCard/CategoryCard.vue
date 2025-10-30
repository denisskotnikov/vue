<script setup lang="ts">
defineProps<{
    label: string;
    icon: string;
}>();
</script>

<template>
    <li class="root">
        <span :class="icon" />
        <p>
            {{ label }}
        </p>
    </li>
</template>

<style scoped>
.root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    padding: 24px;
    font-size: 16px;
    text-align: center;
    background-color: #ededed;
    gap: 8px;

    span {
        font-size: 48px;
    }

    @media (width >= 1200px) {
        width: 100%;
        max-width: 160px;
    }
}
</style>
