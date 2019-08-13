import types from '../../constants';
import { fetchStatus } from "moji-react-native-utils";

const initialState = {
    // categoryList: [],
    // categoryListFetchStatus: fetchStatus.l,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.address.GET_DEFAULT_ADDRESS_DATA:
            return {
                ...{
                    defaultAddress: {},
                    defaultAddressFetchStatus: fetchStatus.l,
                },
                defaultAddress: action.data,
                defaultAddressFetchStatus: action.fetchStatus
            }
        case types.address.GET_ADDRESS_LIST:
            return {
                ...{
                    addressList: [],
                    addressListFetchStatus: fetchStatus.l,
                },
                addressList: action.data,
                addressListFetchStatus: action.fetchStatus
            }
        case types.address.GET_ADDRESS_INFO:
            return {
                ...{
                    addressInfo: {},
                    addressInfoFetchStatus: {},
                },
                addressInfo: {
                    ...{},
                    ...action.addressInfo
                },
                addressInfoFetchStatus: {
                    ...{},
                    ...action.addressInfoFetchStatus
                },
            }
        case types.address.GET_ADDRESS_TYPES_LIST:
            return {
                ...{
                    addressTypeList: [],
                    addressTypeListFetchStatus: fetchStatus.l,
                },
                addressTypeList: action.addressTypeList,
                addressTypeListFetchStatus: action.addressTypeListFetchStatus
            }
        case types.address.GET_AERA_LIST:
            return {
                ...{
                    areaList: [],
                    areaListFetchStatus: fetchStatus.l,
                },
                areaList: action.areaList,
                areaListFetchStatus: action.areaListFetchStatus
            }
        default:
            return state;
    }
}
