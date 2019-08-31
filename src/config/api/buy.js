import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;
export const BuyApi = {
    calculate: {
        url: `${ROOT_URL}buy/calculate`,
        method: 'POST'
    },
    create:{
        url: `${ROOT_URL}buy/create`,
        method: 'POST'
    },
    info:{
        url: `${ROOT_URL}buy/info`,
        method: 'GET'
    },
    pay:{
        url: `${ROOT_URL}buy/pay`,
        method: 'POST'
    },
};
