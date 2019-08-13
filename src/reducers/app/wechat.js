import types from '../../constants';

const initialState = {
    isWXAppInstalled: false,
}

export default (state = initialState, action)=>{
    switch (action.type) {
        case types.wechat.IS_WX_APP_INSTALLED:
            return Object.assign({}, state, {
                isWXAppInstalled: action.data,
            })
        default:
            return state;
    }
}
