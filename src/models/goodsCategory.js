import Model from '../utils/model'
import { GoodsCategoryListInterface } from '../interface/goodsCategory'
import { GoodsCategoryApi } from '../config/api/goodsCategory'
import Fetch from "../utils/fetch";

export default class GoodsCategory extends Model {
    async list(params) {
        try {
            const { result } = await Fetch.request(GoodsCategoryApi.list,{  params })
            return new GoodsCategoryListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
