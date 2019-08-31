import types from '../../constants';
import { Toast } from "../../utils/function";
import { GoodsCategoryApi } from "../../config/api/goodsCategory";
import { GoodsApi } from "../../config/api/goods";
import { fetchStatus } from '../../utils';
import Fetch from '../../utils/fetch'

export const getCategoryList = () => {
    return async dispatch => {
        try {
            const e = await Fetch.fetch({
                api: GoodsCategoryApi.list,
            })
            if (e.code === 0) {
                dispatch(updateCategoryList(e.result.list, fetchStatus.s))
            } else {
                Toast.warn(e.msg)
                dispatch(updateCategoryList(null, fetchStatus.e))
            }
        } catch (err) {
            dispatch(updateCategoryList(null, fetchStatus.f))
        }
    }
}

const updateCategoryList = (data, fetchStatus) => {
    return {
        type: types.category.GET_CATEGORY_LIST,
        data,
        fetchStatus,
    }
}

export const getGoodsDetail = ({ params, fetchStatus: f }) => {
    return async dispatch => {
        if (f === null) {
            dispatch(updateGoodsDetail(null, fetchStatus.l, params.id))
        }
        try {
            const e = await Fetch.fetch({
                api: GoodsApi.info,
                params
            });
            if (e.code === 0) {
                dispatch(updateGoodsDetail(e.result.info, fetchStatus.s, params.id))
            } else {
                Toast.warn(e.msg);
                dispatch(updateGoodsDetail(null, fetchStatus.e, params.id))
            }
        } catch (err) {
            dispatch(updateGoodsDetail(null, fetchStatus.f, params.id))
        }
    }
}

const updateGoodsDetail = (data, fetchStatus, id) => {
    let newData = {};
    newData[id] = data;
    let FetchStatus = {};
    FetchStatus[id] = fetchStatus;

    return {
        type: types.category.GET_GOODS_DETAIL_DATA,
        goodsDetailData: newData,
        goodsDetailFetchStatus: FetchStatus,
    }
}
