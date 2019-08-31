import Model from '../utils/model'
import { BuyCalculateInterface } from '../interface/buyCalculate'
import { BuyCreateOrderInterface ,BuyPayResultInterface} from '../interface/buyCreateOrder'
import { BuyApi } from '../config/api/buy'
import Fetch from "../utils/fetch";

export default class Buy extends Model {
    async calculate(params) {
        try {
            const { result } = await Fetch.request(BuyApi.calculate,{  params })
            return new BuyCalculateInterface(result)
        } catch (e) {
            this.setException(e);
            return false
        }
    }
    async create(params) {
        try {
            const { result } = await Fetch.request(BuyApi.create,{  params })
            return new BuyCreateOrderInterface(result)
        } catch (e) {
            this.setException(e);
            return false
        }
    }
    async pay(params) {
        try {
            const { result } = await Fetch.request(BuyApi.pay,{  params })
            // return new BuyPayResultInterface(result)
            return result
        } catch (e) {
            this.setException(e);
            return false
        }
    }
}
