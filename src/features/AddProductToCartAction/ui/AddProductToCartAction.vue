<script setup lang="ts">
import { useStoreMap, useUnit } from 'effector-vue/composition';

import { type Product, ProductModel } from '@/entities/Product';

const { product } = defineProps<{
    product: Product;
}>();

const [cart] = useUnit([ProductModel.$productCart]);

const productCount = useStoreMap({
    store: ProductModel.$productCart,
    keys() {
        return product;
    },
    fn: (cart, product) => Number(cart[product.id]?.count),
});

const [onAddProductToCart, onRemoveProductFromCart] = useUnit([
    ProductModel.cartProductSettled,
    ProductModel.cartProductRemoved,
]);
</script>
<template>
    <Button
        v-if="!cart[product.id]?.count"
        class="w-full rounded-lg"
        severity="contrast"
        @click="onAddProductToCart(product)"
        >Buy Now</Button
    >
    <ButtonGroup v-if="cart[product.id]?.count > 0">
        <Button class="min-w-[50px] text-xl w-full" severity="contrast" @click="onRemoveProductFromCart(product)"
            >-</Button
        >
        <Button class="min-w-[50px] text-xl w-full" severity="contrast">
            {{ productCount }}
        </Button>
        <Button class="min-w-[50px] text-xl w-full" severity="contrast" @click="onAddProductToCart(product)">+</Button>
    </ButtonGroup>
</template>
