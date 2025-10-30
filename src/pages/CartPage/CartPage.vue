<script setup lang="ts">
import { useUnit } from 'effector-vue/composition';

import { API } from '@/shared/api';
import { normalNumberFormat, shuffled } from '@/shared/lib';
import { MainContainer } from '@/shared/ui';

import { ProductModel } from '@/entities/Product';

import { RootLayout } from '@/widgets/RootLayout';

const [cart, totalCartPrice] = useUnit([ProductModel.$productCart, ProductModel.$totalCartPrice]);

const [onAddProductToCart, onRemoveProductFromCart, onDeleteProduct, resetCart] = useUnit([
    ProductModel.cartProductSettled,
    ProductModel.cartProductRemoved,
    ProductModel.cartProductDelete,
    ProductModel.cartResettled,
]);
</script>
<template>
    <RootLayout>
        <MainContainer class="py-10 lg:grid lg:grid-cols-2 lg:gap-[48px]">
            <div>
                <h2 class="text-lg mb-10">Shopping Cart</h2>
                <ul class="py-10 grid gap-10">
                    <li
                        v-for="{ product } in Object.values(cart)"
                        :key="product.id"
                        class="not-last-of-type:border-b border-solid border-gray-300"
                    >
                        <RouterLink :to="`/product/${product.id}`">
                            <div class="pb-10 flex gap-4 items-center">
                                <Image width="90" :src="API.BASE_URL + shuffled([...product.images])[0]" />
                                <div>
                                    <p>{{ product.name }}</p>
                                    <p># {{ product.id }}</p>
                                    <div class="flex items-center gap-6">
                                        <div class="flex gap-2 items-center">
                                            <Button
                                                severity="contrast"
                                                text
                                                size="large"
                                                class="text-xl"
                                                @click.stop.prevent="onRemoveProductFromCart(Object.assign(product))"
                                                >–</Button
                                            >
                                            <div
                                                class="border w-[32px] text-center h-[32px] border-gray-100 leading-[1.85] rounded-md"
                                            >
                                                {{ cart[product.id]?.count }}
                                            </div>
                                            <Button
                                                severity="contrast"
                                                text
                                                size="large"
                                                class="text-xl"
                                                @click.stop.prevent="onAddProductToCart(Object.assign(product))"
                                                >+</Button
                                            >
                                        </div>
                                        <p>{{ normalNumberFormat(cart[product.id]?.product.price) }}</p>
                                        <Button
                                            text
                                            severity="contrast"
                                            icon="pi pi-times"
                                            @click.stop.prevent="onDeleteProduct(Object.assign(product))"
                                        />
                                    </div>
                                </div>
                            </div>
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div class="border py-[56px] px-4 rounded-lg border-gray-200 flex flex-col">
                <h2 class="text-lg mb-10">Order Summary</h2>
                <div class="flex justify-between mb-10">
                    <p>Total</p>
                    <p>{{ normalNumberFormat(totalCartPrice) }}</p>
                </div>
                <Button severity="contrast" w-full size="large" class="w-full mt-auto" @click="resetCart()"
                    >Checkout</Button
                >
            </div>
        </MainContainer>
    </RootLayout>
</template>
