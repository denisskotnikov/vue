<script setup lang="ts">
import { useUnit } from 'effector-vue/composition';

import { MainContainer } from '@/shared/ui';

import { type Product, ProductList, ProductModel, ProductPreview } from '@/entities/Product';

import { ProductLikeAction } from '@/features/ProductLikeAction';

const [discountedItems] = useUnit([ProductModel.$discountedItems]);
</script>
<template>
    <section class="root">
        <MainContainer>
            <h3 class="title">Discounts up to -50%</h3>
            <ProductList>
                <ProductPreview v-for="product of discountedItems" :key="product.id" :product="product as Product">
                    <template #like-btn>
                        <ProductLikeAction :product-id="product.id" />
                    </template>
                </ProductPreview>
            </ProductList>
        </MainContainer>
    </section>
</template>
<style scoped>
.root {
    margin-bottom: 56px;
}

.title {
    margin-bottom: 32px;
    font-size: 24px;
    line-height: 32px;
    text-align: left;
}
</style>
