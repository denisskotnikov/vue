<script setup lang="ts">
import { isLargeScreen } from '@/shared/lib';

import { RedirectToShopPage } from '@/features/RedirectToShopPage';

defineProps<{
    title: string;
    width: number;
    description: string;
    img: string;
    isLast: boolean;
}>();
</script>
<template>
    <div :class="`px-4 py-10 text-center`">
        <Image :width="width" class="flex justify-center mb-6" :src="img" />
        <h3 class="text-4xl mb-2">{{ title }}</h3>
        <p class="text-[#909090] text-md">{{ description }}</p>
        <RedirectToShopPage
            v-if="isLast"
            :size="isLargeScreen ? 'large' : 'medium'"
            :class="{
                'mt-4': true,
                'w-full': !isLargeScreen,
                flex: isLargeScreen,
                'ml-10': isLargeScreen,
                'max-w-[188px]': isLargeScreen,
            }"
            >Shop Now</RedirectToShopPage
        >
    </div>
</template>
