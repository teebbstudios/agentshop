import Model from '../utils/model'
import { OrderStateNumInterface, OrderListInterface ,OrderGoodsInfoInterface} from '../interface/order'
import { OrderInfoInterface } from '../interface/orderDetail'
import { OrderApi } from '../config/api/order'
import Fetch from "../utils/fetch";

export default class Order extends Model {
    async list(params) {
        try {
            const { result } = await Fetch.request(OrderApi.list,{  params })
            return new OrderListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async detail(params) {
        try {
            const { result } = await Fetch.request(OrderApi.detail,{  params })
            return new OrderInfoInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async stateNum() {
        try {
            const { result } = await Fetch.request(OrderApi.stateNum)
            return new OrderStateNumInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async cancel(params) {
        try {
            await Fetch.request(OrderApi.cancel,{  params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async confirmReceipt(params) {
        try {
            await Fetch.request(OrderApi.confirmReceipt,{  params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async deliverInfo(params) {
        try {
            const { result } = await Fetch.request(OrderApi.deliverInfo,{  params })
            return result
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async logistics(params) {
        try {
            const { result } = await Fetch.request(OrderApi.logistics,{  params })
            return result
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async goodsList(params) {
        try {
            const { result } = await Fetch.request(OrderApi.goodsList,{  params })
            return new OrderGoodsListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async goodsInfo(params) {
        try {
            const { result } = await Fetch.request(OrderApi.goodsInfo,{  params })
            return new OrderGoodsInfoInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
