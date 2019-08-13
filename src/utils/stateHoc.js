import { stateHoc } from 'moji-react-native-utils';
import {
    Loading,
    FailureView,
    Error,
    NullData,
    Login,
} from '../components/fetch';

const ThisModule = (params = {})=>{
    return stateHoc(Object.assign({},{
        LoadingView: Loading,
        FailureView,
        ErrorView: Error,
        NullDataView: NullData,
        LoginView: Login,
    },params))
}


export default ThisModule
