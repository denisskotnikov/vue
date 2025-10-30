<script setup lang="ts">
import { ref } from 'vue';
import { useUnit } from 'effector-vue/composition';

import { isLargeScreen } from '@/shared/lib';
import { MainContainer } from '@/shared/ui';

import { ProductModel } from '@/entities/Product';

import { Search } from '@/features/Search';

import { NAVIGATION_ITEMS } from '../../const';

const items = ref(NAVIGATION_ITEMS);

const [likes, cart] = useUnit([ProductModel.$likedProducts, ProductModel.$productCartCount]);
</script>
<template>
    <header class="lg:m-auto bg-white mb-4 w-full">
        <MainContainer>
            <Menubar class="menubar justify-between border-0 p-0 py-6 pb-2 xl:pb-4" :model="items">
                <template #start>
                    <RouterLink to="/">
                        <Image v-if="!isLargeScreen" draggable="false" src="/logo.svg" width="65" alt="Cyber Logo" />
                        <Image
                            v-if="isLargeScreen"
                            draggable="false"
                            class="mr-75 shrink-0"
                            src="/logo-desktop.svg"
                            width="95"
                            alt="Cyber Logo"
                        />
                    </RouterLink>
                    <Search class="xl:mr-55" />
                </template>
                <template #item="{ item, props }">
                    <RouterLink
                        v-ripple
                        :to="item.label === 'Favorites' ? '/fav' : '/cart'"
                        class="gap-1 flex items-center"
                        v-bind="props.action"
                    >
                        <span class="gap-2 align-center flex pt-2">
                            <OverlayBadge
                                v-if="item.label !== 'Products'"
                                :value="item.label === 'Favorites' ? likes.length : cart"
                                size="small"
                                :severity="null"
                            >
                                <span :class="item.icon" />
                            </OverlayBadge>
                            <span v-if="!isLargeScreen" class="label">{{ item.label }}</span>
                        </span>
                    </RouterLink>
                </template>
            </Menubar>
        </MainContainer>
    </header>
</template>
<style scoped>
.menubar {
    --p-icon-size: 20px;
    --p-menubar-mobile-button-size: 40px;
}
</style>
