import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;
export const ShopApi = {
    info: {
        url: `${ROOT_URL}shop/info`,
        method: 'GET'
    },
}
