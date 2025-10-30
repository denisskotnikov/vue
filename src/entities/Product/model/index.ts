import { createEvent, createStore, restore, sample } from 'effector';
import { persist } from 'effector-storage/local';

import { atom } from '@/shared/factories';
import { shuffled } from '@/shared/lib';
import { appStarted } from '@/shared/services';

import { getAllProductsQuery } from '../api';
import { filterCategoryByKey, findCategories, mapCategoriesLabels } from '../lib';
import type { ID, Product } from '../types';

export const ProductModel = atom(() => {
    const $categories = restore(
        getAllProductsQuery.finished.success.map(({ result }) => mapCategoriesLabels(findCategories(result))),
        []
    );

    // 4 случайных товара со скидкой
    const $discountedItems = restore(
        getAllProductsQuery.finished.success.map(({ result }) =>
            shuffled(result.filter((el) => Boolean(el.discount_price)).filter((el) => el.is_available)).slice(0, 4)
        ),
        []
    );

    const productLikeSettled = createEvent<{ id: string }>();
    const $likedProducts = createStore<string[]>([]).on(productLikeSettled, (products, newProduct) => {
        if (products.find((id) => id === newProduct.id)) {
            return products.filter((id) => id !== newProduct.id);
        }
        return [...products, newProduct.id];
    });

    const cartProductSettled = createEvent<Product>();
    const cartProductRemoved = createEvent<Product>();
    const cartProductDelete = createEvent<Product>();
    const cartResettled = createEvent();
    const $productCart = createStore<{
        [K: ID]: {
            count: number;
            product: Product;
        };
    }>({})
        .reset(cartResettled)
        .on(cartProductSettled, (products, newProduct) => {
            if (products[newProduct.id]?.count) {
                return {
                    ...products,
                    [newProduct.id]: {
                        product: newProduct,
                        count: (products[newProduct.id].count += 1),
                    },
                };
            }

            return {
                ...products,
                [newProduct.id]: {
                    product: newProduct,
                    count: 1,
                },
            };
        })
        .on(cartProductRemoved, (products, newProduct) => {
            if (products[newProduct.id]) {
                const current = {
                    ...products,
                    [newProduct.id]: {
                        product: newProduct,
                        count: (products[newProduct.id].count -= 1),
                    },
                };

                if (current[newProduct.id].count < 1) {
                    delete current[newProduct.id];
                }

                return current;
            }

            return {
                ...products,
            };
        })
        .on(cartProductDelete, (products, newProduct) => {
            const current = { ...products };
            delete current[newProduct.id];
            return current;
        });

    const $productCartCount = $productCart.map((cart) => Object.values(cart).reduce((acc, val) => acc + val.count, 0));

    const $availableProducts = restore(
        getAllProductsQuery.finished.success.map(({ result }) => result.filter((el) => el.is_available)),
        []
    );

    const $newArrivalProducts = $availableProducts.map((products) =>
        products.sort((a, b) => (new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1)).slice(0, 8)
    );

    const $bestSellerProducts = $availableProducts.map((products) =>
        products.sort((a, b) => (a.count_review > b.count_review ? -1 : 1)).slice(0, 8)
    );

    const $featuredProducts = $availableProducts.map((products) =>
        products.sort((a, b) => (a.rating < b.rating ? 1 : -1)).slice(0, 8)
    );

    const $allCharacteristicsNames = $availableProducts.map((products) =>
        products
            .map((product) => product.characteristics)
            .flat(1)
            .filter((obj1, i, arr) => arr.findIndex((obj2) => obj2.characteristic === obj1.characteristic) === i)
            .map((el) => el.characteristic)
            .filter((el) => el === 'Процессор' || el === 'Диагональ')
    );

    const $allProcessorTypes = $availableProducts.map((products) => filterCategoryByKey(products, 'Процессор'));
    const $allDiagonalTypes = $availableProducts.map((products) => filterCategoryByKey(products, 'Диагональ'));

    // V-models
    const $selectedProcessors = createStore<string[]>([]);
    const $selectedDiagonals = createStore<string[]>([]);

    const $allMemoryTypes = $availableProducts.map((products) =>
        filterCategoryByKey(products, 'Объем встроенной памяти').sort((a, b) => (Number(a) > Number(b) ? 1 : -1))
    );

    const $totalCartPrice = $productCart.map((products) => {
        const keys = Object.keys(products);
        return keys.reduce((acc, curr) => acc + products[Number(curr)].product.price * products[Number(curr)].count, 0);
    });

    persist({
        pickup: appStarted,
        store: $likedProducts,
        key: 'liked-products',
    });

    persist({
        pickup: appStarted,
        store: $productCart,
        key: 'cart-products',
    });

    sample({
        clock: appStarted,
        target: [getAllProductsQuery.start],
    });

    return {
        $categories,
        $discountedItems,
        productLikeSettled,
        $likedProducts,
        $newArrivalProducts,
        $bestSellerProducts,
        $featuredProducts,
        $productCart,
        cartProductSettled,
        cartProductRemoved,
        $productCartCount,
        $availableProducts,
        $allMemoryTypes,
        $allCharacteristicsNames,
        $allProcessorTypes,
        $selectedProcessors,
        cartProductDelete,
        $totalCartPrice,
        cartResettled,
        $allDiagonalTypes,
        $selectedDiagonals,
    };
});
