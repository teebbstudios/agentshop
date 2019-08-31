import {env} from '../index';

const ROOT_URL = `${env.apiHost}/server/`;
// const ROOT_URL = `https://ssl.eachock.com/server/`;
export const ChargeApi = {
    list: {
        url: `${ROOT_URL}charge/type/list`,
        method: 'POST'
    },
    chargeOrderCreate: {
        url: `${ROOT_URL}charge/order/create`,
        method: 'POST'
    },
};
