import { createQuery } from '@farfetched/core';

import { API, createCommonRequestFx } from '@/shared/api';

import type { Product } from '../types';

export const getAllProductsQuery = createQuery({
    effect: createCommonRequestFx<void, Product[]>(() => ({
        url: API.products.all,
    })),
    initialData: [],
});

export const getProductByIdQuery = createQuery({
    effect: createCommonRequestFx<string, Product>((id) => ({
        url: API.products.product(id),
    })),
    initialData: {} as Product,
});
