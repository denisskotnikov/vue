<script setup lang="ts">
import { RedirectToShopPage } from '@/features/RedirectToShopPage';
</script>

<template>
    <div class="banner">
        <Image class="img top" src="/landing/bottom-banner/top.webp" />
        <Image class="img left" src="/landing/bottom-banner/left.webp" />
        <h4>Big Summer Sale</h4>
        <p class="description">
            Commodo fames vitae vitae leo mauris in. Eu<br />
            cosequat.
        </p>
        <RedirectToShopPage class-name="m-auto" />

        <Image class="img bottom" src="/landing/bottom-banner/bottom.webp" />
        <Image class="img right" src="/landing/bottom-banner/right.webp" />
    </div>
</template>

<style scoped>
.banner {
    position: relative;
    overflow: hidden;
    padding-top: 104px;
    padding-bottom: 104px;
    text-align: center;
    color: #fff;
    background: linear-gradient(100.23deg, #2e2e2e 42.36%, #000 98.65%);

    h4 {
        position: relative;
        z-index: 1;
        font-size: 48px;
        line-height: 72px;

        @media (width >= 768px) {
            font-size: 72px;
            line-height: 1;
        }
    }

    p {
        position: relative;
        z-index: 1;
        font-size: 16px;
        line-height: 32px;
        color: #787878;

        @media (width >= 768px) {
            br {
                display: none;
            }
        }
    }

    @media (width >= 768px) {
        padding-top: 160px;
        padding-bottom: 90px;
    }
}

.description {
    position: relative;
    z-index: 1;
    margin-bottom: 40px;
}

.img {
    position: absolute;
    left: 0;
    width: 100%;
}

.top,
.bottom {
    @media (width >= 768px) {
        display: none;
    }
}

.top {
    top: 0;
}

.bottom {
    bottom: 0;
}

.left,
.right {
    left: 0;
    top: 0;
    z-index: 0;
    display: none;
    max-width: 561px;

    @media (width >= 768px) {
        display: block;
    }
}

.right {
    left: unset;
    right: 0;
    max-width: 400px;
}
</style>
