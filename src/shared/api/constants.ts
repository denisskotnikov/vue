export const API = {
    URL: import.meta.env.VITE_BASE_URL ?? 'https://angular-final-project-backend.onrender.com/api',
    BASE_URL: 'https://angular-final-project-backend.onrender.com/',
    products: {
        all: '/products',
        product: (id: string) => `/products/${id}`,
    },
};
