<template>
    <ul class="list">
        <slot />
    </ul>
</template>

<style scoped>
.list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;

    @media (width >= 414px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (width >= 992px) {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>
