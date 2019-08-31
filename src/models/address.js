import Model from '../utils/model'
import {AddressListInterface, AddressInfoInterface} from '../interface/address'
import {AddressApi} from '../config/api/address'
import Fetch from "../utils/fetch";

export default class Address extends Model {
    async list(params = {}) {
        try {
            const {result} = await Fetch.request(AddressApi.list, {params})
            return new AddressListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async info(params = {}) {
        try {
            const {result} = await Fetch.request(AddressApi.info, {params})
            return new AddressInfoInterface(result.info)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async add(params = {}) {
        try {
            await Fetch.request(AddressApi.add, {params})
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async edit(params = {}) {
        try {
            await Fetch.request(AddressApi.edit, {params});
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async del(params = {}) {
        try {
            await Fetch.request(AddressApi.del, {params});
            return true
        } catch (e) {
            this.setException(e);
            return false
        }
    }

    async types(params = {}) {
        try {
            const {result} = await Fetch.request(AddressApi.types, {params})
            return result
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async getDefault(params = {}) {
        try {
            const {result} = await Fetch.request(AddressApi.getDefault, {params})
            return new AddressInfoInterface(result.info)
        } catch (e) {
            this.setException(e);
            return false
        }
    }

    async setDefault(params = {}) {
        try {
            const {result} = await Fetch.request(AddressApi.setDefault, {params})
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
