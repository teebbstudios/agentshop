import Model from '../utils/model'
import {GoodsCollectListInterface } from '../interface/goodsCollect'
import { GoodsCollectApi } from '../config/api/goodsCollect'
import Fetch from "../utils/fetch";

export default class GoodsCollect extends Model {
    async list(params) {
        try {
            const { result } = await Fetch.request(GoodsCollectApi.mine,{  params })
            return new GoodsCollectListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async add(params) {
        try {
            await Fetch.request(GoodsCollectApi.add,{  params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async del(params) {
        try {
            await Fetch.request(GoodsCollectApi.del,{  params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
