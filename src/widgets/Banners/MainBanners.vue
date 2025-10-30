<script setup lang="ts">
import { isLargeScreen } from '@/shared/lib';

import { BANNERS } from './const';
import { BannerWrapper } from './ui';
</script>

<template>
    <div class="banners">
        <BannerWrapper
            v-for="banner of BANNERS"
            :key="banner.id"
            :width="isLargeScreen && banner.widthLarge ? banner.widthLarge : banner.width"
            :class="`item item-${banner.id} ${banner.className}`"
            :title="banner.title"
            :img="banner.img"
            :description="banner.description"
            :is-last="banner.id === BANNERS[BANNERS.length - 1].id"
        />
    </div>
</template>

<style lang="scss">
.item {
    position: relative;
    overflow: hidden;

    span:has(img) {
        left: 0;
        top: 0;

        @media (width >= 1200px) {
            position: absolute;
        }
    }
}

.banners {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;

    @media (width >= 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (width >= 1200px) {
        grid-template-areas:
            'ps ps mac'
            'airpods visionpro mac';
    }
}

.item-0 {
    @media (width >= 1200px) {
        grid-area: airpods;
        min-height: 272px;
        place-content: center;

        span:has(img) {
            scale: 1.34;
            bottom: 0 !important;
            top: unset;
            left: -25%;
        }

        p,
        h3 {
            max-width: 160px;
            text-align: left;
            padding-left: 134px;
            box-sizing: content-box;
            font-style: italic;
        }

        h3 {
            font-size: 29px;
            max-width: 30%;
        }

        p {
            font-size: 14px;
            max-width: 30%;
        }
    }
}

.item-1 {
    @media (width >= 1200px) {
        grid-area: visionpro;
        min-height: 272px;
        place-content: center;

        span:has(img) {
            bottom: 0 !important;
            left: -200px;
            top: unset;
        }

        p,
        h3 {
            max-width: 160px;
            text-align: left;
            padding-left: 134px;
            box-sizing: content-box;
            font-style: italic;
            place-content: center;
            place-items: center;
        }

        h3 {
            font-size: 29px;
        }

        p {
            font-size: 14px;
        }
    }
}

.item-2 {
    @media (width >= 1200px) {
        grid-area: ps;
        text-align: left;
        min-height: 328px;
        padding-left: 334px;
        place-content: center;

        p,
        h3 {
            max-width: 338px;
        }

        h3 {
            font-size: 48px;
            font-style: italic;
        }

        p {
            font-size: 14px;
        }

        img {
            scale: 1.1;
            margin-left: -50%;
            margin-top: -1%;
        }
    }
}

.item-3 {
    @media (width >= 1200px) {
        grid-area: mac;
        min-width: 720px;
        place-content: center;

        span:has(img) {
            scale: 2.5;
            top: 125px !important;
            right: -130% !important;
        }

        h3,
        p {
            max-width: 360px;
            text-align: left;
            padding-left: 40px;
        }

        p {
            font-size: 14px;
        }

        h3 {
            font-size: 49px;
        }
    }
}
</style>
