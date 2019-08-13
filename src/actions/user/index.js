import types from '../../constants';
import Fetch from "../../utils/fetch";
import { storageModule } from "moji-react-native-utils";
import { Toast } from "../../utils/function";
import { UserApi } from "../../config/api/user";
import { OrderApi } from '../../config/api/order';
import { CartApi } from '../../config/api/cart';
import NavigationService from "../../containers/navigationService";

/**
 * 登陆方法
 **/
export const userLogin = ({ user_token } = {}) => {
    return async dispatch => {
        //登陆后需要处理的方法
        await dispatch(setUserToken(true,user_token));
        userLoginSuccessAfter({ dispatch, user_token });
    }
}


/**
 * 退出登陆方法
 **/
export const userLogout = () => {
    return async dispatch => {
        //设置退出登陆状态
        dispatch(setUserStatus(false, null))
        //退出登陆后需要处理的方法
        userLogoutAfter({ dispatch })
    }
}


/**
 * 初始化检查用户登陆
 **/
export const initUserInfoStorage = () => {
    return async dispatch => {
        // dispatch(userLogout())
        //获取本地缓存用户信息数据
        const userInfoCache = await storageModule.getUserInfo()
        const userTokenCache = await storageModule.get("user_token");
        if (userInfoCache || userTokenCache) {
            const userInfo = JSON.parse(userInfoCache)
            const userToken = JSON.parse(userTokenCache)

            await dispatch(setUserStatus(true, userInfo))
            await dispatch(setUserToken(true,userToken))
            await dispatch(getOrderStateNum());
            await dispatch(getCartTotalNum());

        } else {
            //没有用户信息缓存
            //未来邀请注册什么的放在这里写逻辑
        }
        dispatch({
            type: types.app.INIT_USERINFO_STORAGE,
            data: true
        })
    }
}


/**
 * 更新用户信息
 **/
export const updateUserInfo = () => {
    return dispatch => {
        dispatch({
            type: types.user.UPDATE_USER_INFO_LOADING,
            refreshing: true,
        })
        Fetch.fetch({
            api: UserApi.self
        })
            .then((e) => {
                if (e.code === 0) {
                    dispatch(updateUserInfoFunc(e.result.info))
                } else {
                    Toast.warn("获取用户最新数据异常");
                    dispatch({
                        type: types.user.UPDATE_USER_INFO_LOADING,
                        refreshing: false,
                    })
                }
            })
    }
}


/**
 * 修改用户信息
 **/
export const modifyUserInfo = ({params}) => {
    return dispatch => {
        Fetch.fetch({
            api: UserApi.editProfile,
            params
        })
            .then((e) => {
                if (e.code === 0) {
                    Toast.info('保存成功')
                    dispatch(updateUserInfo())
                    // dispatch(updateUserInfoFunc(e.data))
                } else {
                    Toast.error(e.errmsg)
                }
            })
    }
}


/**
 * 被动修改用户信息
 **/
export const passiveModifyUserInfo = ({ data, callback }) => {
    return dispatch => {
        dispatch(updateUserInfoFunc(data))
        callback && callback()
    }
}


//登陆后需要处理的方法
const userLoginSuccessAfter = ({ dispatch, user_token }) => {
    storageModule.set("user_token", JSON.stringify(user_token))
        .then(async () => {
            await dispatch(updateUserInfo())
            await dispatch(getOrderStateNum())
            await dispatch(getCartTotalNum())
            NavigationService.goBack()
        })
}


//退出登陆后需要处理的方法
const userLogoutAfter = ({ dispatch}) => {
    storageModule.removeUserInfo()
    storageModule.remove("user_token")
    dispatch(changeOrderStateNum({
        state_new: 0,
        state_send: 0,
        state_success: 0,
        state_close: 0,
        state_unevaluate: 0,
        state_refund: 0,
    }))
    dispatch(changeCartTotalNum(0))
    NavigationService.goBack()
}


// 设置用户状态
const setUserStatus = (login, userInfo) => {
    return dispatch => {
        return new Promise(resolve => {
            dispatch({
                type: types.user.USER_STATUS_CHANGE,
                login,
                userInfo
            })
            resolve()
        })
    }
}

// 设置用户状态
const setUserToken = (login,userToken) => {
    return dispatch => {
        return new Promise(resolve => {
            dispatch({
                type: types.user.USER_TOKEN_CHANGE,
                userToken,
                login
            })
            resolve()
        })
    }
}


// 更新用户信息方法
export const updateUserInfoFunc = (e) => {
    storageModule.setUserInfo(e)
    return {
        type: types.user.UPDATE_USER_INFO,
        userInfo: e,
        refreshing: false,
    }
}


// 更新订单状态数量
export const getOrderStateNum = () => {
    return dispatch => {
        Fetch.fetch({
            api: OrderApi.stateNum
        })
            .then((e) => {
                if (e.code === 0) {
                    dispatch(changeOrderStateNum(e.result))
                } else {
                    Toast.warn(e.msg)
                }
            })
    }
}
export const changeOrderStateNum = (orderNum) =>{
    return dispatch => {
        dispatch({
            type: types.user.GET_ORDER_STATE_NUM,
            orderNum
        })
    }
}


// 更新购物车商品数量
export const getCartTotalNum = () => {
    return dispatch => {
        Fetch.fetch({
            api: CartApi.totalNum
        })
            .then((e) => {
                if (e.code === 0) {
                    dispatch(changeCartTotalNum(e.result.total_num))
                }
            })
    }
}
export const changeCartTotalNum = (cartNum) =>{
    return dispatch => {
        dispatch({
            type: types.user.GET_CART_TOTAL_NUM,
            cartNum
        })
    }
}
