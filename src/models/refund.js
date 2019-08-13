import Model from '../utils/model'
import { RefundListInterface, RefundInfoInterface } from '../interface/refund'
import { RefundResonListInterface } from '../interface/refundReson'
import { RefundApi } from '../config/api/refund'
import Fetch from "../utils/fetch";

export default class Refund extends Model {
    async reasonList(params) {
        try {
            const { result } = await Fetch.request(RefundApi.reasonList, { params })
            return new RefundResonListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async list(params) {
        try {
            const { result } = await Fetch.request(RefundApi.list, { params })
            return new RefundListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async info(params) {
        try {
            const { result } = await Fetch.request(RefundApi.info, { params })
            return new RefundInfoInterface(result.info)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async apply(params) {
        try {
            await Fetch.request(RefundApi.apply, { params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async setTrackingNo(params) {
        try {
            await Fetch.request(RefundApi.setTrackingNo, { params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async revoke(params) {
        try {
            await Fetch.request(RefundApi.revoke, { params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

}
