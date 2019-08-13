import fa from "../utils/fa";

export default {
    async list(params = {}) {
        return await fa.request(
            {
                url: `wechat/buildConfig`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `wechat/code`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `wechat/userinfo`,
                method: 'GET'
            }, {
                params
            }
        )
    },
}
