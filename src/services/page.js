import fa from "../utils/fa";

export default {
    async portal(params = {}) {
        return await fa.request(
            {
                url: `page/portal`,
                method: 'GET',
                showLoading: false,
                needLogin: false,
            }, {
                params
            }
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `page/info`,
                method: 'GET',
                showLoading: false,
                needLogin: false,
            }, {
                params
            }
        )
    },
}
