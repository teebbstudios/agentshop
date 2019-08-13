import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;

export const AddressApi = {
    setDefault: {
        url: `${ROOT_URL}address/setDefault`,
        method: 'POST'
    },
    getDefault: {
        url: `${ROOT_URL}address/default`,
        method: 'GET',
    },
    list: {
        url: `${ROOT_URL}address/list`,
        method: 'GET'
    },
    info: {
        url: `${ROOT_URL}address/info`,
        method: 'GET'
    },
    add: {
        url: `${ROOT_URL}address/add`,
        method: 'POST'
    },
    edit: {
        url: `${ROOT_URL}address/edit`,
        method: 'POST'
    },
    del: {
        url: `${ROOT_URL}address/del`,
        method: 'POST'
    },
    types: {
        url: `${ROOT_URL}address/types`,
        method: 'GET'
    },
}
