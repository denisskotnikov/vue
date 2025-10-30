import { createEvent, createStore } from 'effector';

import { atom } from '@/shared/factories';

export const SearchModel = atom(() => {
    const searched = createEvent<string>();
    const $search = createStore('').on(searched, (_, search) => search);

    return {
        searched,
        $search,
    };
});
