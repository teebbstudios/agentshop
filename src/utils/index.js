import stateHoc from "./stateHoc";
import { Toast } from './function';
import { initLibraryConfig, config, fetchStatus, storageModule } from "moji-react-native-utils";
import { AppName, AppPlatform, errorCollectApi, env } from "../config";
import { setIsShowFetchLoading } from "../actions/app";
import { userLogout } from "../actions/user";
import store from "../store";
import NavigationService from "../containers/navigationService";

initLibraryConfig({
    ToastInfo: (content) => {
        Toast.info(content)
    },
    ToastError: (content) => {
        Toast.warn(content)
    },
    ToastWarn: (content) => {
        Toast.error(content)
    },
    // API_URL,
    getLogin: () => {
        const {
            user
        } = store.getState().app
        const {
            login
        } = user
        return login
    },
    pushLogin: () => {
        NavigationService.navigate("UserLogin");
    },
    APP_ROOT_CONFIG: {
        AppName,
        AppPlatform,
        errorCollectApi,
        env,
    },
    removeUserInfo: () => {
        store.dispatch(userLogout())
    },
    showLoading: () => {
        store.dispatch(setIsShowFetchLoading(true))
    },
    hideLoading: () => {
        store.dispatch(setIsShowFetchLoading(false))
    },
    getHeaders: () => {
        const {
            user,
        } = store.getState().app
        const {
            userToken
        } = user
        return {
            'Access-Token': userToken ? userToken.access_token : null,
            'Source': 'app',
        }
    },
})


export {
    stateHoc,
    fetchStatus,
    storageModule,
    config
}
