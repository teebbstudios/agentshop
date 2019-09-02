import types from '../../constants';
import Fetch from "../../utils/fetch";
import { Toast } from "../../utils/function";
import * as WeChat from 'react-native-wechat';
import { userLogin, updateUserInfo } from '../../actions/user';
import { UserApi } from "../../config/api/user";
import {AppID,AppSecret} from "../../config/wechat"
import { BuyApi } from '../../config/api/buy';

export const initWechat = ()=>{
    return async dispatch=>{
        const isRegistered = await WeChat.registerApp(AppID)
        const isInstalled = await WeChat.isWXAppInstalled()
        dispatch({
            type: types.wechat.IS_WX_APP_INSTALLED,
            data: isInstalled
        })
    }
};


export const sendWechatAuthRequest=async()=>{
    try {
        const e = await WeChat.sendAuthRequest('snsapi_userinfo','SECRET')
        try {
            return addAuth(e)
        } catch (err) {
            Toast.error(err)
            return new Promise((resolve, reject)=>{
                reject(err)
            })
        }
    } catch (e) {
        Toast.warn('授权失败')
        return new Promise((resolve, reject)=>{
            reject('授权失败')
        })
    }
};

export const wechatLogin = ({tokenData, userData})=>{
    return async dispatch=>{
        try{
            const params = {
                login_type: 'wechat_app',
                wechat_openid: userData.openid
            };
            const e = await Fetch.fetch({
                api: UserApi.login,
                params
            });
            if(e.code===10014){
                dispatch(wechatRegister({ tokenData, userData }))
            }else{
                if(e.code===0){
                    dispatch(
                        userLogin({
                            user_token: e.result
                        })
                    )
                }else {
                    Toast.warn(e.msg)
                }
            }
        }catch(err){
            console.log('err',err);
        }
    }
}

export const wechatRegister = ({tokenData, userData})=>{
    const params = {
        register_type: 'wechat_app',
        wechat_openid: userData.openid,
        wechat: userData
    }
    return async dispatch=>{
        const e = await Fetch.fetch({
            api: UserApi.register,
            params
        })
        if(e.code===0){
            dispatch(wechatLogin({
                tokenData,
                userData,
            }))
        }else {
            Toast.warn(e.msg)
        }
    }
}

export const wechatShare = async ({ type, params }) => {
    let func
    switch (type) {
        case 'timeline':
            func = WeChat.shareToTimeline
            break;
        case 'session':
            func = WeChat.shareToSession
            break;
        case 'favorite':
            func = WeChat.shareToFavorite
            break;
        default:
            return Toast.warn('分享类型异常')
    }
    if (func) {
        const e = await func(params)
        if (parseInt(e.errCode) === 0) {
            Toast.info('分享成功');
        } else {
            Toast.warn('分享失败');
        }
    }
}


export const wechatBind=({tokenData,userData})=>{
    return async dispatch=>{
        const e = await Fetch.fetch({
            api: UserApi.bindWechat,
            params: {
                wechat_openid: userData.openid,
                wechat: userData
            }
        })
        if(e.errcode===0){
            Toast.info('绑定成功')
            dispatch(updateUserInfo())
        }else {
            Toast.warn(e.errmsg)
        }
    }
}

export const wechatPay=({params, successCallback}={})=>{
    return async dispatch=>{
        const { result } = await Fetch.request(BuyApi.pay,{params});
        const payOptions = {
            partnerId: result.partnerid,    // 商家向财付通申请的商家id
            prepayId: result.prepayid,    // 预支付订单
            nonceStr: result.noncestr,    // 随机串，防重发
            timeStamp: result.timestamp,    // 时间戳，防重发
            package: result.package,    // 商家根据财付通文档填写的数据和签名
            sign: result.sign,    // 商家根据微信开放平台文档对数据做的签名
        };
        try {
            const a = await WeChat.pay(payOptions);
            Toast.info('支付成功');
            successCallback && successCallback()
        } catch (err) {
            Toast.warn('支付失败');
        }
    }
}


const addAuth = (e)=>{
    return new Promise(async(resolve, reject)=>{
        const {
            errCode,
            code,
        } = e
        if(errCode===0){
            const tokenParams = {
                appid:AppID,
                secret:AppSecret,
                code,
                grant_type:'authorization_code',
            }
            const tokenData = await Fetch.externalLinkFetch(`https://api.weixin.qq.com/sns/oauth2/access_token?${toQueryString(tokenParams)}`)
            if(tokenData.errcode!==40029){
                const openidParams = {
                    appid:AppID,
                    access_token:tokenData.access_token,
                    openid:tokenData.openid,
                    lang:'zh_CN',
                }
                const userData = await Fetch.externalLinkFetch(`https://api.weixin.qq.com/sns/userinfo?${toQueryString(openidParams)}`)
                return resolve({
                    tokenData,
                    userData,
                })
            }else{
                reject('获取用户access_token异常');
            }
        }else{
            reject('授权失败');
        }
    })
}



function toQueryString(obj) {
    return obj
        ? Object.keys(obj)
              .sort()
              .map(function(key) {
                  var val = obj[key];
                  if (Array.isArray(val)) {
                      return val
                          .sort()
                          .map(function(val2) {
                              return encodeURIComponent(key) +
                                  "[]=" +
                                  encodeURIComponent(val2);
                          })
                          .join("&");
                  }
                  if (val) {
                      return encodeURIComponent(key) +
                          "=" +
                          encodeURIComponent(val);
                  } else {
                      return encodeURIComponent(key) + "=";
                  }
              })
              .join("&")
        : "";
}
