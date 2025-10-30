<script setup lang="ts">
import { ref } from 'vue';
import { useUnit } from 'effector-vue/composition';
import type { AutoCompleteCompleteEvent, AutoCompleteOptionSelectEvent } from 'primevue/autocomplete';

import { router } from '@/pages/router';

import { isLargeScreen } from '@/shared/lib';

import { ProductModel } from '@/entities/Product';

const [products] = useUnit([ProductModel.$availableProducts]);
const filteredProducts = ref();

const search = (event: AutoCompleteCompleteEvent) => {
    if (!event.query.trim().length) {
        filteredProducts.value = [...products.value];
    } else {
        filteredProducts.value = products.value.filter((product) =>
            product.name.toLowerCase().startsWith(event.query.toLowerCase())
        );
    }
};

const select = (event: AutoCompleteOptionSelectEvent) => {
    router.push({
        path: `/product/${event.value.id}`,
    });
};
</script>
<template>
    <IconField v-if="isLargeScreen">
        <InputIcon class="pi pi-search" />
        <AutoComplete
            :suggestions="filteredProducts"
            option-label="name"
            size="large"
            class="input min-w-[372px] placeholder-shown:border-transparent focus-visible:border-green-600 placeholder-shown:italic placeholder-gray-400 text-md"
            variant="filled"
            placeholder="Search"
            @complete="search"
            @option-select="select"
        />
    </IconField>
</template>
<style scoped>
.input > * {
    width: 100%;
}
</style>
