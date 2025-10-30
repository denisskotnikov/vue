import type { Product } from '../types';

export const findCategories = (products: Product[]) => [...new Set(products.map((product) => product.category))];
