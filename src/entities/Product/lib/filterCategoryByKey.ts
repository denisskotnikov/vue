import type { Product } from '../types';

export const filterCategoryByKey = (products: Product[], key: string) =>
    products
        .map((product) => product.characteristics)
        .flat(1)
        .filter((obj1) => obj1.characteristic === key)
        .filter((obj1, i, arr) => arr.findIndex((obj2) => obj2.value === obj1.value) === i)
        .map((el) => el.value);
