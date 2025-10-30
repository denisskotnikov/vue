<script setup>
import { ref } from 'vue';
import { useUnit, useVModel } from 'effector-vue/composition';

import { ProductFilters, ProductFiltersModel } from '@/features/ProductFilters';

const visible = ref(false);

const sort = useVModel(ProductFiltersModel.$sortBy);
const options = ref([
    {
        code: 'rating',
        name: 'By Rating',
    },
    {
        code: 'data',
        name: 'By Date',
    },
    {
        code: 'price',
        name: 'By Price',
    },
]);

const [totalProducts] = useUnit([ProductFiltersModel.$totalFilteredProducts]);
</script>
<template>
    <div class="grid grid-cols-2 gap-4 mb-8 items-center">
        <p class="hidden lg:block">
            Selected Products: <b class="text-lg">{{ totalProducts }}</b>
        </p>
        <Button
            outlined
            severity="contrast"
            label="Filters"
            icon="pi pi-sliders-h"
            icon-pos="right"
            size="large"
            class="lg:hidden justify-between"
            @click="visible = true"
        />
        <Select
            v-model="sort"
            size="large"
            :options="options"
            option-label="name"
            placeholder="Sort By"
            class="w-full lg:w-[256px] lg:place-self-end"
        />
    </div>

    <Drawer v-model:visible="visible" class="mt-[200px]" position="full">
        <template #container>
            <div class="mx-4 pt-10">
                <div class="mb-6">
                    <Button text severity="contrast" size="large" class="text-2xl" @click="visible = false">
                        <span class="pi pi-chevron-left mr-4" />Filters
                    </Button>
                </div>
                <ProductFilters />
                <Button @click="visible = false">Apply</Button>
            </div>
        </template>
    </Drawer>
</template>
