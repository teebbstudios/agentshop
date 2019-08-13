import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;
export const OrderApi = {
    stateNum: {
        url: `${ROOT_URL}order/stateNum`,
        method: 'GET'
    },
    list: {
        url: `${ROOT_URL}order/list`,
        method: 'GET'
    },
    detail: {
        url: `${ROOT_URL}order/info`,
        method: 'GET'
    },
    cancel: {
        url: `${ROOT_URL}order/cancel`,
        method: 'POST'
    },
    confirmReceipt:{
        url: `${ROOT_URL}order/confirmReceipt`,
        method: 'POST'
    },
    deliverInfo: {
        url: `${ROOT_URL}order/deliverInfo`,
        method: 'GET'
    },
    logistics: {
        url: `${ROOT_URL}order/logistics`,
        method: 'GET'
    },
    goodsList: {
        url: `${ROOT_URL}order/goodsList`,
        method: 'GET'
    },
    goodsInfo: {
        url: `${ROOT_URL}order/goodsInfo`,
        method: 'GET'
    },
}
