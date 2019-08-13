import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;
export const GoodsCollectApi = {
    list: {
        url: `${ROOT_URL}goodscollect/mine`,
        method: 'GET'
    },
    add: {
        url: `${ROOT_URL}goodscollect/add`,
        method: 'POST'
    },
    del: {
        url: `${ROOT_URL}goodscollect/del`,
        method: 'POST'
    },
}
