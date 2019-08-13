import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;
export const GoodsCategoryApi = {
    list: {
        url: `${ROOT_URL}goodscategory/list`,
        method: 'GET'
    },
}
