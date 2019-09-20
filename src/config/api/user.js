import {env} from '../index';

const ROOT_URL = `${env.apiHost}/`;
export const UserApi = {
    login: {
        url: `${ROOT_URL}server/user/login`,
        method: 'POST'
    },
    register: {
        url: `${ROOT_URL}server/user/register`,
        method: 'POST'
    },
    logout: {
        url: `${ROOT_URL}server/user/logout`,
        method: 'GET'
    },
    token: {
        url: `${ROOT_URL}server/user/token`,
        method: 'POST'
    },
    editPassword: {
        url: `${ROOT_URL}server/user/editPassword`,
        method: 'POST'
    },
    verifyCode: {
        url: `${ROOT_URL}server/Verifycode/add`,
        method: 'POST'
    },
    self: {
        url: `${ROOT_URL}server/user/self`,
        method: 'GET'
    },
    editPasswordByFind: {
        url: `${ROOT_URL}server/user/editPasswordByFind`,
        method: 'POST'
    },
    editProfile: {
        url: `${ROOT_URL}server/user/editProfile`,
        method: 'POST'
    },
    bindPhone: {
        url: `${ROOT_URL}server/user/bindPhone`,
        method: 'POST'
    },
    bindWechat: {
        url: `${ROOT_URL}server/user/bindWechat`,
        method: 'POST'
    },
    unbindWechat: {
        url: `${ROOT_URL}server/user/unbindWechat`,
        method: 'POST'
    },
    unbindPhone: {
        url: `${ROOT_URL}server/user/unbindWechat`,
        method: 'POST'
    },
    evaluatedList: {
        url: `${ROOT_URL}server/user/evaluatedList`,
        method: 'GET'
    },
    editCustomDiscount: {
        url: `${ROOT_URL}server/user/editCustomDiscount`,
        method: 'POST'
    },
    userTixianShenqing: {
        url: `${ROOT_URL}server/user/tixian/shenqing`,
        method: 'POST'
    },
    userTixianList: {
        url: `${ROOT_URL}server/user/tixian/list`,
        method: 'POST'
    },
    balanceChangeRecords: {
        url: `${ROOT_URL}server/user/balance/records`,
        method: 'POST'
    },
    agentInfo: {
        url: `${ROOT_URL}server/agent/info`,
        method: 'POST'
    },
    agentAmount: {
        url: `${ROOT_URL}server/agent/amount`,
        method: 'GET'
    },
    agentOrderList: {
        url: `${ROOT_URL}server/agent/order/list`,
        method: 'POST'
    },
    agentTotalOrderNum: {
        url: `${ROOT_URL}server/agent/order/total/number`,
        method: 'POST'
    }
};
