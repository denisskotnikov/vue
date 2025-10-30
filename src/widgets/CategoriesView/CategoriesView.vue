<script setup lang="ts">
import { useUnit } from 'effector-vue/composition';

import { MainContainer } from '@/shared/ui';

import { CategoryCard, getAllProductsQuery, ProductModel } from '@/entities/Product';

const [categories, isLoading] = useUnit([ProductModel.$categories, getAllProductsQuery.$pending]);
</script>
<template>
    <section class="my-[80px] text-2xl">
        <MainContainer>
            <h2 class="italic mb-[32px]">Browse by category</h2>
            <ProgressSpinner v-if="isLoading" class="justify-center flex my-8" />
            <ul v-if="!isLoading" class="list">
                <CategoryCard
                    v-for="category in categories"
                    :key="category.id"
                    :label="category.label"
                    :icon="category.icon"
                />
            </ul>
        </MainContainer>
    </section>
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
        grid-template-columns: repeat(3, 1fr);
    }

    @media (width >= 1200px) {
        display: flex;
        gap: 32px;
    }
}
</style>
