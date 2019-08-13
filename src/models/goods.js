import Model from '../utils/model'
import { GoodsListInterface} from '../interface/goods'
import { GoodsInterface } from '../interface/goodsDetail'
import { GoodsApi } from '../config/api/goods'
import Fetch from "../utils/fetch";

export default class Goods extends Model {
    async list(params) {
        try {
            const { result } = await Fetch.request(GoodsApi.list,{  params })
            return new GoodsListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async info(params) {
        try {
            const { result } = await Fetch.request(GoodsApi.info,{  params })
            return new GoodsInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
