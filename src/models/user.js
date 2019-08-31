import Model from '../utils/model'
import {  UserSelfInterface, UserTokenInfoInterface } from '../interface/user'
import { UserApi } from '../config/api/user'
import Fetch from "../utils/fetch";

export default class User extends Model {
    constructor(){
        super(null)
    }
    async login(params = { login_type: 'password', phone: null, password: null }) {
        try {
            const { result } = await Fetch.request(UserApi.login,{  params })
            return new UserTokenInfoInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async register(params) {
        try {
            request(UserApi.register,{  params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async logout() {
        try {
            await Fetch.request(UserApi.logout)
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async editPassword(params) {
        try {
            await Fetch.request(UserApi.editPassword,{  params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async findPassword() {
        try {
            await Fetch.request(UserApi.findPassword)
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async token() {
        try {
            const { result } = await Fetch.request(UserApi.token);
            return new UserTokenInfoInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async self() {
        try {
            const { result } = await Fetch.request(UserApi.self)
            return new UserSelfInterface(result)
        } catch (e) {
            console.log(e)
            this.setException(e)
            return false
        }
    }

    async editPasswordByFind(params) {
        try {
            await Fetch.request(UserApi.editPasswordByFind,{  params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async editProfile(params) {
        try {
            await Fetch.request(UserApi.editProfile,{  params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async bindPhone(params) {
        try {
            await Fetch.request(UserApi.bindPhone,{  params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async bindWechat(params) {
        try {
            await Fetch.request(UserApi.bindWechat,{  params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async unbindWechat() {
        try {
            await Fetch.request(UserApi.unbindWechat)
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async unbindPhone() {
        try {
            await Fetch.request(UserApi.unbindPhone)
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    // todo interface
    async evaluatedList() {
        try {
            const { result } = await Fetch.request(UserApi.evaluatedList)
            return new EvaluatedListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
