import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;
export const AreaApi = {
    list: {
        url: `${ROOT_URL}area/list`,
        method: 'GET'
    },
    info: {
        url: `${ROOT_URL}area/info`,
        method: 'GET'
    },
}
