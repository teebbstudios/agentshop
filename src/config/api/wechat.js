import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;
export const WechatApi = {
    buildConfig: {
        url: `${ROOT_URL}wechat/buildConfig`,
        method: 'GET'
    },
    code: {
        url: `${ROOT_URL}wechat/code`,
        method: 'GET'
    },
    userinfo: {
        url: `${ROOT_URL}wechat/userinfo`,
        method: 'GET'
    },
}
