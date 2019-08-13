import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;
export const GoodsEvaluateApi = {
    list: {
        url: `${ROOT_URL}goods/evaluateList`,
        method: 'GET'
    },
    mine: {
        url: `${ROOT_URL}goodsevaluate/list`,
        method: 'GET'
    },
    add: {
        url: `${ROOT_URL}goodsevaluate/add`,
        method: 'POST'
    },
    append: {
        url: `${ROOT_URL}goodsevaluate/append`,
        method: 'POST'
    },
    info: {
        url: `${ROOT_URL}goodsevaluate/detail`,
        method: 'GET'
    },
    isEvaluated: {
        url: `${ROOT_URL}goodsevaluate/isEvaluated`,
        method: 'GET'
    },
}
