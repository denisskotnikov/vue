import { API } from './constants';
import { createRequestFx } from './create-request-fx';

export * from './constants';
export * from './methods';

export const createCommonRequestFx = createRequestFx({
    baseURL: API.URL,
});
