import { combine, createStore } from 'effector';

import { atom } from '@/shared/factories';

import { type Product, ProductModel } from '@/entities/Product';

export const ProductFiltersModel = atom(() => {
    const $sortBy = createStore<{
        code: string;
        name: string;
    }>({} as { code: string; name: string });

    const $paginatedProducts = combine(
        {
            products: ProductModel.$availableProducts,
            sort: $sortBy,
            processors: ProductModel.$selectedProcessors,
            diagonals: ProductModel.$selectedDiagonals,
        },
        ({ products, sort, processors, diagonals }) => {
            const currentProducts = [...products].filter((product) => {
                const currentProcessor =
                    product.characteristics.find((char) => char.characteristic === 'Процессор')?.value ?? '';

                const currentDiagonals =
                    product.characteristics.find((char) => char.characteristic === 'Диагональ')?.value ?? '';

                // Проверяем соответствие фильтрам
                const matchesProcessor = processors.length === 0 || processors.includes(currentProcessor);
                const matchesDiagonal = diagonals.length === 0 || diagonals.includes(currentDiagonals);

                return matchesProcessor && matchesDiagonal;
            });

            switch (sort.code) {
                case 'rating':
                    currentProducts.sort((a, b) => (a.rating > b.rating ? 1 : -1));
                    break;
                case 'data':
                    currentProducts.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
                    break;
                case 'price':
                    currentProducts.sort((a, b) => (a.price > b.price ? 1 : -1));
                    break;
                default:
                    break;
            }

            const size = 9;
            const subarray: Product[][] = [];
            for (let i = 0; i < Math.ceil(currentProducts.length / size); i++) {
                subarray[i] = currentProducts.slice(i * size, i * size + size);
            }

            return subarray;
        }
    );

    const $totalFilteredProducts = $paginatedProducts.map((el) => el.flat(Infinity).length);

    return {
        $sortBy,
        $paginatedProducts,
        $totalFilteredProducts,
    };
});
