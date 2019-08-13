import Model from '../utils/model'
import { AreaListInterface,AreaInfoInterface } from '../interface/area'
import { AreaApi } from '../config/api/area'
import Fetch from "../utils/fetch";

export default class Area extends Model {
    async list(params) {
        try {
            const { result } = await Fetch.request(AreaApi.list,{  params })
            return new AreaListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async info(params) {
        try {
            const { result } = await Fetch.request(AreaApi.info,{  params })
            return new AreaInfoInterface(result.info)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
