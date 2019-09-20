import types from '../../constants';

const initialState = {
    login : false,
    userInfo : null,
    userToken : null,
    couponNum : 0,
    refreshing : false,
    orderNum : {
        state_new : 0,
        state_send : 0,
        state_success : 0,
        state_close : 0,
        state_unevaluate : 0,
        state_refund : 0,
    },
    cartNum : 0,
    cardList : [],
    unreadMessageNumber: 0,
    myDemandHallDetail:{},
    myDemandDetailFetchstatus:{},
    pointsSigninfo:{},
};

export default (state = initialState, action)=> {
    switch (action.type) {
        case types.user.USER_TOKEN_CHANGE:
            return Object.assign({}, state, {
                userToken: action.userToken.token,
                login: action.login,
            });
        case types.user.USER_STATUS_CHANGE:
            return Object.assign({}, state, {
                login: action.login,
                userInfo: action.userInfo,
            });
        case types.user.UPDATE_USER_INFO:
            return Object.assign({}, state, {
                userInfo: action.userInfo,
                refreshing: action.refreshing,
            });
        case types.user.GET_ORDER_STATE_NUM:
            return Object.assign({}, state, {
                orderNum : action.orderNum,
            });
        case types.user.GET_CART_TOTAL_NUM:
            return Object.assign({}, state, {
                cartNum : action.cartNum,
            });
        case types.user.UPDATE_USER_INFO_LOADING:
            return Object.assign({}, state, {
                refreshing: action.refreshing,
            });
        case types.user.GET_USER_CARD_LIST:
            return Object.assign({}, state, {
                cardList: action.cardList,
            });
        case types.user.SET_UNREAD_MESSAGE_NUMBER:
            return Object.assign({}, state, {
                unreadMessageNumber: action.number,
            });
        case types.user.GET_USER_POINTS_SIGNINFO:
            return Object.assign({}, state, {
                pointsSigninfo: action.pointsSigninfo,
            });
        case types.user.GET_USER_MYDEMANDDETAIL:
            return Object.assign({}, state, {
                myDemandHallDetail:action.myDemandDetailData,
                myDemandDetailFetchstatus:action.myDemandDetailStatus,
            });
        case types.user.GET_USER_AGENT_INFO:
            return Object.assign({}, state, {
                agentInfo: action.agentInfo
            });
        default:
            return state;
    }
}
