import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;
export const CartApi = {
    list: {
        url: `${ROOT_URL}cart/list`,
        method: 'POST'
    },
    add: {
        url: `${ROOT_URL}cart/add`,
        method: 'POST'
    },
    edit: {
        url: `${ROOT_URL}cart/edit`,
        method: 'POST'
    },
    del: {
        url: `${ROOT_URL}cart/del`,
        method: 'POST'
    },
    exist: {
        url: `${ROOT_URL}cart/exist`,
        method: 'GET'
    },
    info: {
        url: `${ROOT_URL}cart/info`,
        method: 'GET'
    },
    check: {
        url: `${ROOT_URL}cart/check`,
        method: 'POST'
    },
    destroy: {
        url: `${ROOT_URL}cart/destroy`,
        method: 'POST'
    },
    totalNum: {
        url: `${ROOT_URL}cart/totalNum`,
        method: 'GET'
    },
}
