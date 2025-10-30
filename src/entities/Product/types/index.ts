import type { Nullable } from '@/shared/lib/types';

type Categories = string;
type Brands = string;
type Color = string;
type CountReview = number;
type Country = string;
type CreatedAt = Date | string;
export type ID = number;
type Price = number;
type Guarantees = number;
type Rating = number;
type IsAvailable = boolean;
type StoreAddress = string;
type Name = string;
type Image = string;

interface Characteristic {
    characteristic: string;
    unit_type: string;
    value: string;
}

export interface Product {
    id: ID;
    createdAt: CreatedAt;
    price: Price;
    discount_price: Nullable<Price>;
    guarantee: Guarantees;
    rating: Rating;
    count_review: CountReview;
    is_available: IsAvailable;
    store_address: StoreAddress;
    color: Color;
    brand: Brands[];
    country: Country;
    category: Categories;
    name: Name;
    images: Image[];
    characteristics: Characteristic[];
}
