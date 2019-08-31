import { fetchData } from "moji-react-native-utils";
import exceptionUtil from '../utils/exception'
// import store from "../store";
// import { userLogout } from "../actions/user"

export default class Fetch {
    static fetch({ api, params = {} }) {
        return fetchData.fetch({
            api,
            params,
        })
            .then((e) => {
                // console.log(api, params, e)
                return e
            })

    }

    static async externalLinkFetch(...e) {
        const res = await fetch(...e);
        return res.json()
    }

    /**
     * 请求
     * 注意：当返回code就抛出错误是为了日后完善错误编码国际化
     * @param api
     * @param options
     * @returns {*|Promise<*>|PromiseLike<T | never>|Promise<T | never>}
     */
    static request(api, options = { params: {} }) {
        const { params } = options
        // console.log(api, params, e, config.getHeaders())
        return fetchData.fetch({
            api,
            params,
        })
            .then((e) => {
                // console.log(api, params, e, config.getHeaders())
                if (e.code === 0) {
                    return e
                } 
                // else if(e.code===10005){
                //     store.dispatch(userLogout())
                // } 
                else {
                    console.log(`接口：${api.url} 请求fail`)
                    throw new exceptionUtil(e.msg, e.code)
                }
            })
    }

}
