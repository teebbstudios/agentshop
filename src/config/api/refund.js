import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;
export const RefundApi = {
    reasonList: {
        url: `${ROOT_URL}orderrefund/reasonList`,
        method: 'GET'
    },
    apply: {
        url: `${ROOT_URL}orderrefund/apply`,
        method: 'POST'
    },
    list: {
        url: `${ROOT_URL}orderrefund/list`,
        method: 'GET'
    },
    info: {
        url: `${ROOT_URL}orderrefund/info`,
        method: 'GET'
    },
    setTrackingNo: {
        url: `${ROOT_URL}orderrefund/setTrackingNo`,
        method: 'POST'
    },
    revoke: {
        url: `${ROOT_URL}orderrefund/revoke`,
        method: 'POST'
    },
}
