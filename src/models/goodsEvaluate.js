import Model from '../utils/model'
import { GoodsEvaluateListInterface} from '../interface/goods'
import { GoodsEvaluateListInterface as GoodsEvaluateMineInterface,GoodsEvaluateInfoInterface} from '../interface/goodsEvaluate'
import { GoodsEvaluateApi } from '../config/api/goodsEvaluate'
import Fetch from "../utils/fetch";

export default class GoodsEvaluate extends Model {
    async list(params) {
        try {
            const { result } = await Fetch.request(GoodsEvaluateApi.list,{  params })
            return new GoodsEvaluateListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async mine(params) {
        try {
            const { result } = await Fetch.request(GoodsEvaluateApi.mine,{  params })
            return new GoodsEvaluateMineInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async add(params) {
        try {
            await Fetch.request(GoodsEvaluateApi.add,{  params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async info(params) {
        try {
            const { result } = await Fetch.request(GoodsEvaluateApi.info,{  params })
            return new GoodsEvaluateInfoInterface(result.info)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async append(params) {
        try {
            await Fetch.request(GoodsEvaluateApi.append,{  params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async isEvaluated(params) {
        try {
            await Fetch.request(GoodsEvaluateApi.isEvaluated,{  params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
