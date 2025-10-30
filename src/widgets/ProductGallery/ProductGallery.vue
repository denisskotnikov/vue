<script setup lang="ts">
import { ref } from 'vue';
import { useUnit } from 'effector-vue/composition';

import { API } from '@/shared/api';
import { isLargeScreen } from '@/shared/lib';

import { getProductByIdQuery } from '@/entities/Product';

const { data: product } = useUnit(getProductByIdQuery);

const responsiveOptions = ref([
    {
        breakpoint: '1300px',
        numVisible: 4,
    },
    {
        breakpoint: '575px',
        numVisible: 1,
    },
]);
</script>
<template>
    <div class="justify-center flex py-[40px] mb-[53px]">
        <Galleria
            :show-thumbnail-navigators="false"
            :thumbnails-position="isLargeScreen ? 'left' : 'bottom'"
            :value="[product.images ?? '']"
            :responsive-options="responsiveOptions"
            :num-visible="5"
            :container-style="`max-width: ${isLargeScreen ? 546 : 343}px; border: 0;`"
        >
            <template #item="slotProps">
                <img width="265" :src="API.BASE_URL + slotProps.item" :alt="slotProps.item.alt" style="width: 100%" />
            </template>
            <template #thumbnail="slotProps">
                <img :src="API.BASE_URL + slotProps.item" :alt="slotProps.item.alt" width="80" />
            </template>
        </Galleria>
    </div>
</template>
