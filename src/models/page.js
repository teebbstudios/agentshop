import Model from '../utils/model'
import { PageApi } from '../config/api/page'
import Fetch from "../utils/fetch";

export default class Order extends Model {

    async info(params) {
        try {
            const { result } = await Fetch.request(PageApi.info,{  params })
            return result.info
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async portal(params) {
        try {
            const { result } = await Fetch.request(PageApi.portal,{  params })
            return result.info
        } catch (e) {
            this.setException(e)
            return false
        }
    }

}
