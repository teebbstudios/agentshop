import Model from '../utils/model'
import { ShopApi } from '../config/api/shop'
import Fetch from "../utils/fetch";

export default class Shop extends Model {
    async info(params) {
        try {
            const { result } = await Fetch.request(ShopApi.info,{  params })
            return result
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
