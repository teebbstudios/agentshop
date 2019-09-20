import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;
export const ShopApi = {
    info: {
        url: `${ROOT_URL}shop/info`,
        method: 'GET'
    },
    version : {
        url: `${ROOT_URL}shop/app/version`,
        method: 'GET'
    },
    services:  {
        url: `${ROOT_URL}shop/services`,
        method: 'GET'
    },
};
