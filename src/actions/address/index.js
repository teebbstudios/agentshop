import types from '../../constants';
import { Toast } from "../../utils/function";
import { AddressApi } from "../../config/api/address";
import { AreaApi } from "../../config/api/area";
import {
    fetchStatus
} from '../../utils';
import Fetch from '../../utils/fetch'
import fa from '../../utils/fa';

export const getDefaultAddress = () => {
    return async dispatch => {
        try {
            const e = await Fetch.fetch({
                api: AddressApi.getDefault,
            })
            if (e.code === 0) {
                dispatch(updateDefaultAddress(e.result.data, fetchStatus.s))
            } else {
                Toast.warn(e.msg)
                dispatch(updateDefaultAddress(null, fetchStatus.e))
            }
        } catch (err) {
            dispatch(updateDefaultAddress(null, fetchStatus.f))
        }
    }
};

const updateDefaultAddress = (data, fetchStatus) => {
    return {
        type: types.address.GET_DEFAULT_ADDRESS_DATA,
        defaultAddress: data,
        defaultAddressFetchStatus: fetchStatus,
    }
};

export const setDefaultAddress = () => {
    return async dispatch => {
        try {
            const e = await Fetch.fetch({
                api: AddressApi.setDefault,
            })
            if (e.code === 0) {
                dispatch(getDefaultAddress())
            } else {
                Toast.warn(e.msg)
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const getAddressList = () => {
    return async dispatch => {
        try {
            const e = await Fetch.fetch({
                api: AddressApi.list,
            })
            if (e.code === 0) {
                dispatch(updateAddressList(e.result.list, fetchStatus.s))
            } else {
                Toast.warn(e.msg)
                dispatch(updateAddressList(null, fetchStatus.e))
            }
        } catch (err) {
            dispatch(updateAddressList(null, fetchStatus.f))
        }
    }
}

const updateAddressList = (data, fetchStatus) => {
    return {
        type: types.address.GET_ADDRESS_LIST,
        addressList: data,
        addressListFetchStatus: fetchStatus,
    }
}

export const getAddressInfo = ({ params, fetchStatus: f }) => {
    return async dispatch => {
        if (f === null) {
            dispatch(updateAddressInfo(null, fetchStatus.l, params.id))
        }
        try {
            const e = await Fetch.fetch({
                api: AddressApi.info,
                params
            })
            if (e.code === 0) {
                dispatch(updateAddressInfo(e.result.info, fetchStatus.s, params.id))
            } else {
                Toast.warn(e.msg)
                dispatch(updateAddressInfo(null, fetchStatus.e, params.id))
            }
        } catch (err) {
            dispatch(updateAddressInfo(null, fetchStatus.f, params.id))
        }
    }
}

const updateAddressInfo = (data, fetchStatus, id) => {
    let newData = {}
    newData[id] = data
    let FetchStatus = {}
    FetchStatus[id] = fetchStatus

    return {
        type: types.address.GET_ADDRESS_INFO,
        addressInfo: newData,
        addressInfoFetchStatus: FetchStatus,
    }
}

export const addAddress = () => {
    return async dispatch => {
        try {
            const e = await Fetch.fetch({
                api: AddressApi.add,
            })
            if (e.code === 0) {
                dispatch(getAddressList())
            } else {
                Toast.warn(e.msg)
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const editAddress = () => {
    return async dispatch => {
        try {
            const e = await Fetch.fetch({
                api: AddressApi.edit,
            })
            if (e.code === 0) {
                dispatch(getAddressList())
            } else {
                Toast.warn(e.msg)
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const delAddress = () => {
    return async dispatch => {
        try {
            const e = await Fetch.fetch({
                api: AddressApi.del,
            })
            if (e.code === 0) {
                dispatch(getAddressList())
            } else {
                Toast.warn(e.msg)
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const getAddressTypeList = () => {
    return async dispatch => {
        try {
            const e = await Fetch.fetch({
                api: AddressApi.types,
            })
            if (e.code === 0) {
                dispatch(updateAddressTypeList(e.result.list, fetchStatus.s))
            } else {
                Toast.warn(e.msg)
                dispatch(updateAddressTypeList(null, fetchStatus.e))
            }
        } catch (err) {
            dispatch(updateAddressTypeList(null, fetchStatus.f))
        }
    }
}

const updateAddressTypeList = (data, fetchStatus) => {
    return {
        type: types.address.GET_ADDRESS_TYPES_LIST,
        addressTypeList: data,
        addressTypeListFetchStatus: fetchStatus,
    }
}

export const getAreaList = ({params}) => {
    const { parames } = params;
    return async dispatch => {
        try {
            const e = await Fetch.fetch({
                api: AreaApi.list,
                params
            });
            if (e.code === 0) {
                dispatch(updateAreaList(fa.getAntAreaList(e.result.list), fetchStatus.s));
            } else {
                Toast.warn(e.msg)
                dispatch(updateAreaList(null, fetchStatus.e))
            }
        } catch (err) {
            dispatch(updateAreaList(null, fetchStatus.f))
        }
    }
}

const updateAreaList = (data, fetchStatus) => {
    return {
        type: types.address.GET_AERA_LIST,
        areaList: data,
        areaListFetchStatus: fetchStatus,
    }
}
