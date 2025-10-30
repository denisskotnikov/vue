<script setup lang="ts">
import { useUnit } from 'effector-vue/composition';

import { type Product, ProductList, ProductModel, ProductPreview } from '@/entities/Product';

import { AddProductToCartAction } from '@/features/AddProductToCartAction';
import { ProductLikeAction } from '@/features/ProductLikeAction';

const [products] = useUnit([ProductModel.$featuredProducts]);
</script>
<template>
    <ProductList>
        <ProductPreview v-for="product of products" :key="product.id" :product="product as Product">
            <template #like-btn>
                <ProductLikeAction :product-id="product.id" />
            </template>
            <template #cart-btn>
                <AddProductToCartAction :product="product as Product" />
            </template>
        </ProductPreview>
    </ProductList>
</template>
