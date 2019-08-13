import fa from "../utils/fa";

export default {
    async list(params = {}) {
        return await fa.request(
            {
                url: `area/list`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `area/info`,
                method: 'GET'
            }, {
                params
            }
        )
    },
}
