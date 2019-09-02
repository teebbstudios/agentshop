import types from '../../constants';

const initialState = {
    showBootPage : false,
    showFetchLoading : false,
    initUserInfoStorageState : false,
    appBasisData:null,
    versionUpdateState:null,
    versionUpdateData:null,
    showVersionUpdate:false,
    showMessageModal:false,
    messageModalData:null,
    showAppIntro: false,
}

export default (state = initialState, action)=>{
    switch (action.type) {
        case types.app.UPDATE_FIRST_OPEN:
            return Object.assign({}, state, {
                showBootPage: action.data,
            });
        case types.app.UPDATE_FETCH_LOADING:
            return Object.assign({}, state, {
                showFetchLoading: action.data,
            });
        case types.app.INIT_USERINFO_STORAGE:
            return Object.assign({}, state, {
                initUserInfoStorageState: action.data,
            });
        case types.app.APP_BASIS_DATA:
            return Object.assign({}, state, {
                appBasisData: action.data,
                appBasisDataFetchStatus: action.fetchStatus,
            });
        case types.app.CHECK_VERSION_UPDATE:
            return Object.assign({}, state, {
                versionUpdateData: action.versionUpdateData,
                versionUpdateState: action.versionUpdateState,
                showVersionUpdate: action.showVersionUpdate,
            });
        case types.app.SET_SHOW_VERSION_UPDATE:
            return Object.assign({}, state, {
                showVersionUpdate: action.showVersionUpdate,
            });
        case types.app.SET_SHOW_MESSAGE_MODAL:
            return Object.assign({}, state, {
                showMessageModal: action.showMessageModal,
                messageModalData: action.data,
            });
        case types.app.CHANGE_SHOW_APP_INTRO:
            return Object.assign({}, state, {
                showAppIntro: action.showAppIntro,
            });
        default:
            return state;
    }
}
