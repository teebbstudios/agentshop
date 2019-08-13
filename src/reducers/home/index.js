import types from '../../constants';
import { fetchStatus } from "moji-react-native-utils";

const initialState = {
    // homeView: [],
    // homeViewFetchStatus: fetchStatus.l,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.home.GET_HOME_VIEW:
            return {
                ...{
                    homeView: null,
                    homeViewFetchStatus: fetchStatus.l,
                },
                homeView: action.data,
                homeViewFetchStatus: action.fetchStatus
            }
        default:
            return state;
    }
}
