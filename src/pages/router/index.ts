import { createRouter, createWebHistory } from 'vue-router';

import { CartPage } from '@/pages/CartPage';
import { FavPage } from '@/pages/FavPage';
import { IndexPage } from '@/pages/IndexPage';
import { ProductPage } from '@/pages/ProductPage';
import { ProductsPage } from '@/pages/ProductsPage';

const routes = [
    {
        path: '/',
        component: IndexPage,
    },
    {
        path: '/products',
        component: ProductsPage,
    },
    {
        path: '/product/:id',
        component: ProductPage,
        props: true,
    },
    {
        path: '/fav',
        component: FavPage,
    },
    {
        path: '/cart',
        component: CartPage,
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
