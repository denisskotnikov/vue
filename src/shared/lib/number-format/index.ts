export const normalNumberFormat = (num: number) =>
    Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        currencyDisplay: 'narrowSymbol',
        maximumFractionDigits: 0,
    }).format(num);
