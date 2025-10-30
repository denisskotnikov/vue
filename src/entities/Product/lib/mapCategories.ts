export const CATEGORIES_MAP: Record<string, string> = {
    Смартфоны: 'Phones',
    Компьютеры: 'Computers',
    Планшеты: 'Tablets',
    Часы: 'Smart Watches',
    Гаджеты: 'Gadgets',
    Аксессуары: 'Accessories',
};

const CATEGORY_ICON_MAP: Record<string, string> = {
    Смартфоны: 'pi pi-mobile ',
    Компьютеры: 'pi pi-desktop',
    Планшеты: 'pi pi-tablet',
    Часы: 'pi pi-clock',
    Гаджеты: 'pi pi-gauge',
    Аксессуары: 'pi pi-headphones',
};

export const mapCategoriesLabels = (
    categories: string[]
): {
    label: string;
    id: number;
    icon: string;
}[] =>
    categories.map((category, idx) => ({
        label: CATEGORIES_MAP[category],
        id: idx,
        icon: CATEGORY_ICON_MAP[category],
    }));
