<script setup lang="ts">
import { ref } from 'vue';
import { useUnit } from 'effector-vue/composition';

import { isLargeScreen } from '@/shared/lib';
import { MainContainer } from '@/shared/ui';

import { type Product, ProductList, ProductPreview } from '@/entities/Product';

import { AddProductToCartAction } from '@/features/AddProductToCartAction';
import { ProductFilters, ProductFiltersModel } from '@/features/ProductFilters';
import { ProductLikeAction } from '@/features/ProductLikeAction';

import { ProductsGridFilterBar } from '@/widgets/ProductsGrid';

const [products] = useUnit([ProductFiltersModel.$paginatedProducts]);

const page = ref(0);
</script>

<template>
    <MainContainer class="container">
        <div class="lg:grid grid-cols-[256px_1fr] lg:gap-[32px]">
            <ProductFilters v-if="isLargeScreen" />

            <div>
                <ProductsGridFilterBar />
                <ProductList class="list">
                    <ProductPreview v-for="product in products[page]" :key="product.id" :product="product as Product">
                        <template #like-btn>
                            <ProductLikeAction :product-id="product.id" />
                        </template>
                        <template #cart-btn>
                            <AddProductToCartAction :product="product as Product" />
                        </template>
                    </ProductPreview>
                </ProductList>
            </div>
        </div>

        <Paginator v-model:first="page" :rows="1" :total-records="products.length" />
    </MainContainer>
</template>
<style scoped>
.container {
    margin-top: 40px;
    margin-bottom: 72px;
}

.list {
    @media (width >= 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
