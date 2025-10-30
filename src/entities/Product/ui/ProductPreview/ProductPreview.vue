<script setup lang="ts">
import { API } from '@/shared/api';
import { normalNumberFormat, shuffled } from '@/shared/lib';

import type { Product } from '../../types';

defineProps<{
    product: Product;
}>();
</script>
<template>
    <li class="item">
        <slot class="action" name="like-btn" />
        <RouterLink :to="`product/${product.id}`">
            <img aria-hidden="true" alt="" :src="API.BASE_URL + shuffled([...product.images])[0]" />
            <p class="line-clamp-2">{{ product.name }}</p>
            <p>{{ normalNumberFormat(product.price) }}</p>
        </RouterLink>
        <slot name="cart-btn" />
    </li>
</template>
<style scoped>
.item {
    border-radius: 1rem;
    padding: 24px 12px;
    text-align: center;
    background-color: #f6f6f6;

    @media (width >= 768px) {
        padding: 24px 16px;
    }
}

.action {
    margin-bottom: 8px;
    font-size: 32px;

    @media (width >= 992px) {
        margin-bottom: 16px;
    }
}

p {
    margin: 0 0 1rem;
    font-family:
        ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
        'Noto Color Emoji';

    &:first-of-type {
        min-height: 48px;
    }

    &:last-of-type {
        font-size: 24px;
        line-height: 1;
    }
}

img {
    display: block;
    margin: auto auto 8px;
    width: 104px;
    height: 104px;
    mix-blend-mode: multiply;

    @media (width >= 992px) {
        margin-bottom: 16px;
        width: 160px;
        height: 160px;
    }
}
</style>
