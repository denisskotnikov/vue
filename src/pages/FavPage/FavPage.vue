<script setup lang="ts">
import { useStoreMap, useUnit } from 'effector-vue/composition';

import { API } from '@/shared/api';
import { shuffled } from '@/shared/lib';
import { MainContainer } from '@/shared/ui';

import { ProductModel } from '@/entities/Product';

import { RootLayout } from '@/widgets/RootLayout';

const [likedProducts] = useUnit([ProductModel.$likedProducts]);

const products = useStoreMap({
    store: ProductModel.$availableProducts,
    keys: () => likedProducts,
    fn: (products, likedProducts) => products.filter((product) => likedProducts.value.includes(`${product.id}`)),
});
</script>
<template>
    <RootLayout>
        <MainContainer class="py-[40px] lg:max-w-[350px]">
            <div>
                <h2 class="text-xl pb-10 border-b-gray-200 border-b-1">Favorite</h2>
                <ul class="py-10 grid gap-10">
                    <li v-for="product in products" :key="product.id">
                        <RouterLink :to="`/product/${product.id}`">
                            <div class="flex gap-4 items-center">
                                <Image width="90" :src="API.BASE_URL + shuffled(product.images)[0]" />
                                <div>
                                    <p>{{ product.name }}</p>
                                    <p># {{ product.id }}</p>
                                </div>
                            </div>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </MainContainer>
    </RootLayout>
</template>
