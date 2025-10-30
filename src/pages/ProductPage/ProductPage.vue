<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUnit } from 'effector-vue/composition';

import { MainContainer } from '@/shared/ui';

import { getAllProductsQuery, getProductByIdQuery } from '@/entities/Product';

import { ProductGallery } from '@/widgets/ProductGallery';
import { ProductInfo } from '@/widgets/ProductInfo';
import { RootLayout } from '@/widgets/RootLayout';

const { pending } = useUnit(getAllProductsQuery);

const route = useRoute();

watch(() => route.params.id as string, getProductByIdQuery.start, { immediate: true });
</script>
<template>
    <RootLayout>
        <ProgressSpinner v-if="pending" class="m-auto flex mt-[20%]" />
        <MainContainer v-if="!pending" class="py-10">
            <div class="lg:flex lg:gap-[48px]">
                <ProductGallery />
                <ProductInfo />
            </div>
        </MainContainer>
    </RootLayout>
</template>
