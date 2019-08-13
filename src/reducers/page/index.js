import types from '../../constants';
import { fetchStatus } from "moji-react-native-utils";

const initialState = {
    pageInfo: [],
    pageInfoFetchStatus: fetchStatus.l,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.page.GET_PAGE_INFO:
            return {
                ...{
                    pageInfo: null,
                    pageInfoFetchStatus: fetchStatus.l,
                },
                pageInfo: action.pageInfo,
                pageInfoFetchStatus: action.pageInfoFetchStatus
            }
        default:
            return state;
    }
}
