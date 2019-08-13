import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;

export const PageApi = {
    portal:{
        url: `${ROOT_URL}page/portal`,
        method: 'GET',
        showLoading: false,
        needLogin: false,
    },
    info: {
        url: `${ROOT_URL}page/info`,
        method: 'GET',
        showLoading: false,
        needLogin: false,
    },
}
