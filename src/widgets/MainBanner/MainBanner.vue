<script setup lang="ts">
import { isLargeScreen } from '@/shared/lib';
import { MainContainer } from '@/shared/ui';

import { RedirectToShopPage } from '@/features/RedirectToShopPage';
</script>
<template>
    <section class="text-white bg-neutral-900">
        <MainContainer class="lg:flex">
            <div class="lg:pb-47 mb-8 lg:mb-0 lg:max-w-[714px] lg:w-[100%]">
                <div class="mb-6 flex flex-col gap-4 lg:gap-6 text-center lg:text-left">
                    <h3 :class="`pt-22 lg:pt-47 text-2xl text-neutral-500`">Pro.Beyond.</h3>
                    <h2 class="text-7xl lg:text-8xl">IPhone 14 Pro</h2>
                    <p class="text-neutral-500 lg:text-lg">
                        Created to change everything for the better. <br v-if="!isLargeScreen" />For everyone
                    </p>
                </div>
                <RedirectToShopPage
                    class="mb-12 flex text-white border-white m-auto min-w-[170px] min-h-[56px] lg:m-0"
                />
            </div>
            <Image
                draggable="false"
                class="flex justify-center shrink-0 lg:justify-start"
                :width="isLargeScreen ? 406 : 343"
                :src="`/landing/banner-iphone/${isLargeScreen ? 'iphone-desktop' : 'iphone'}@2x.webp`"
            />
        </MainContainer>
    </section>
</template>
