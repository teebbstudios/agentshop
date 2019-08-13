import Model from '../utils/model'
import { WechatApi } from '../config/api/user'
import Fetch from "../utils/fetch";

export default class Wechat extends Model {
    async buildConfig(params) {
        try {
            const { result } = await Fetch.request(WechatApi.buildConfig,{  params })
            return result
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async code(params) {
        try {
            const { result } = await Fetch.request(WechatApi.code,{  params })
            return result
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async userinfo(params) {
        try {
            const { result } = await Fetch.request(WechatApi.userinfo,{  params })
            return result
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
