import types from '../../constants';
import { Toast } from "../../utils/function";
import { PageApi } from "../../config/api/page";
import { fetchStatus } from '../../utils';
import Fetch from '../../utils/fetch'


export const getPageInfo = ({ params }) => {
    return async dispatch => {
        try {
            const e = await Fetch.fetch({
                api: PageApi.info,
                params
            })
            if (e.code === 0) {
                dispatch(updatePageInfo(e.result.info, fetchStatus.s))
            } else {
                Toast.warn(e.msg)
                dispatch(updatePageInfo(null, fetchStatus.e))
            }
        } catch (err) {
            dispatch(updatePageInfo(null, fetchStatus.f))
        }
    }
}

const updatePageInfo = (data, fetchStatus) => {
    return {
        type: types.page.GET_PAGE_INFO,
        pageInfo: data,
        pageInfoFetchStatus: fetchStatus,
    }
}
