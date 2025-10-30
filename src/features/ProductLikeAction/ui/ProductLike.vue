<script setup lang="ts">
const { productId } = defineProps<{
    productId: number;
    text?: string;
}>();
import { useStoreMap, useUnit } from 'effector-vue/composition';

import { ProductModel } from '@/entities/Product/index.js';

const [onProductLikeClick] = useUnit([ProductModel.productLikeSettled]);

const isLiked = useStoreMap({
    store: ProductModel.$likedProducts,
    keys: () => productId,
    fn: (products, productId) => products.includes(`${productId}`),
});
</script>
<template>
    <Button
        size="large"
        type="button"
        :variant="text ? 'outlined' : 'text'"
        severity="contrast"
        :icon="`${text ? null : `pi ${isLiked ? 'pi-heart-fill' : 'pi-heart '}`}`"
        aria-label="Set Like for a product"
        class="flex p-2"
        :class="`text-(${isLiked ? 'red-500' : 'gray-400'}) ${text ? 'w-full m-0 justify-center' : 'ml-auto justify-end mt-[-0.5rem] mr-[-0.5rem] w-fit'}`"
        :label="text ? text : ''"
        @click="
            onProductLikeClick({
                id: `${productId}`,
            })
        "
    />
</template>
