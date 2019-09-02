import types from "../../constants";
import Fetch from "../../utils/fetch";
import {fetchStatus, storageModule} from "moji-react-native-utils";
import {Toast} from "../../utils/function";
import {AppPlatform, AppVersion} from "../../config";
import {ShopApi} from '../../config/api/shop'


export const setIsShowBootPage = (e) => {
    return dispatch => {
        dispatch({
            type: types.app.UPDATE_FIRST_OPEN,
            data: e,
        })
    }
};


export const setIsShowFetchLoading = (e) => {
    return dispatch => {
        dispatch({
            type: types.app.UPDATE_FETCH_LOADING,
            data: e,
        })
    }
};

//
// export const getAppBasisData = (e) => {
//     return dispatch => {
//         Fetch.fetch({apiName: 'CONFIGLISTS'})
//             .then(
//                 (e) => {
//                     if (e.code === 0) {
//                         dispatch({
//                             type: types.app.APP_BASIS_DATA,
//                             data: e.data,
//                             fetchStatus: fetchStatus.s,
//                         })
//                     } else {
//                         dispatch({
//                             type: types.app.APP_BASIS_DATA,
//                             fetchStatus: fetchStatus.e,
//                         })
//                     }
//                 },
//                 (err) => {
//                     dispatch({
//                         type: types.app.APP_BASIS_DATA,
//                         fetchStatus: fetchStatus.f,
//                     })
//                 }
//             )
//     }
// }


export const checkVersionUpdate = () => {
    return async dispatch => {
        const e = await Fetch.fetch({
            api: ShopApi.version,
            params: {
                platform: AppPlatform,
                version: AppVersion,
            }
        });
        if (e.code === 0) {
            const showVersionUpdate = (() => {
                switch (e.data.update_state) {
                    case 'required' :
                        return true;
                    case 'optional' :
                        return true;
                    case 'noneed' :
                        return false;
                    default:
                        Toast.error('服务端返回检查版本更新数据类型异常')
                        return false
                }
            })();
            dispatch({
                type: types.app.CHECK_VERSION_UPDATE,
                versionUpdateData: e.data,
                versionUpdateState: e.data.update_state,
                showVersionUpdate,
            })
        } else {
            Toast.error('版本检查更新异常')
        }
    }
};


export const setShowVersionUpdate = (e) => {
    return dispatch => {
        dispatch({
            type: types.app.SET_SHOW_VERSION_UPDATE,
            showVersionUpdate: e,
        })
    }
};


export const setShowMessageModal = ({show, data}) => {
    return dispatch => {
        dispatch({
            type: types.app.SET_SHOW_MESSAGE_MODAL,
            showMessageModal: show,
            data,
        })
    }
};


export const checkAppIntroIsShow = (e) => {
    return async dispatch => {
        const isStorage = await storageModule.get('appIntroV1')
        if (!isStorage) {
            dispatch({
                type: types.app.CHANGE_SHOW_APP_INTRO,
                showAppIntro: true,
            })
        }
    }
};


export const changeShowAppIntro = (e) => {
    return dispatch => {
        dispatch({
            type: types.app.CHANGE_SHOW_APP_INTRO,
            showAppIntro: e,
        })
    }
};
