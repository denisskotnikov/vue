<script setup lang="ts">
import { MainContainer } from '@/shared/ui';

import { BestsellersProducts, FeaturedProducts, NewArrivals } from './ui';
</script>
<template>
    <section class="root">
        <MainContainer>
            <Tabs value="new">
                <TabList>
                    <Tab class="text-black" value="new">New Arrival</Tab>
                    <Tab class="text-black" value="best">Bestseller</Tab>
                    <Tab class="text-black" value="featured">Featured Products</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="new"><NewArrivals /></TabPanel>
                    <TabPanel value="best"><BestsellersProducts /></TabPanel>
                    <TabPanel value="featured"><FeaturedProducts /></TabPanel>
                </TabPanels>
            </Tabs>
        </MainContainer>
    </section>
</template>
<style scoped>
.root {
    --p-tabs-active-bar-background: #000;
    --p-tabs-active-bar-height: 2px;
    --p-tabs-tab-border-width: 0;
    --p-tabs-tabpanel-padding: 32px 0 0 0;

    margin-bottom: 56px;
}
</style>
