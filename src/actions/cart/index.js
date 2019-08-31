import { Toast } from "../../utils/function";
import { CartApi } from "../../config/api/cart";
import Fetch from '../../utils/fetch'
import { getCartTotalNum } from "../user";

export const list = async ({ params } = {}) => {
    try {
        const e = await Fetch.fetch({
            api: CartApi.list,
            params
        })
        if (e.code === 0) {
            return e.result;
        } else {
            Toast.warn(e.msg)
        }
    } catch (err) {
        Toast.warn(err)
    }
}

export const add = ({ params }) => {
    return async dispatch => {
        try {
            const e = await Fetch.fetch({
                api: CartApi.add,
                params
            });
            if (e.code === 0) {
                dispatch(getCartTotalNum(params.userToken));
                return true
            } else {
                return false
            }
        } catch (err) {
            Toast.warn(err)
        }
    }
}

export const edit = ({params}) => {
    return async dispatch => {
        try {
            const e = await Fetch.fetch({
                api: CartApi.edit,
                params
            });
            dispatch(getCartTotalNum(params.userToken));
            if (e.code === 0)
            {
                return e.code === 0;
            }else{
                Toast.warn(e.msg);
                return false;
            }
        } catch (err) {
            Toast.warn(err)
        }
    }
}

export const del = async ({ params = {} }) => {
    try {
        const e = await Fetch.fetch({
            api: CartApi.del,
            params
        })
        return e.code === 0;
    } catch (err) {
        Toast.warn(err)
    }
}
export const exist = async ({ params = {} }) => {
    try {
        const e = await Fetch.fetch({
            api: CartApi.exist,
            params
        });
        return e.result.state
    }catch (err) {
        Toast.warn(err)
    }
}
export const info = async ({ params = {} }) => {
    try {
        const e = await Fetch.fetch({
            api: CartApi.info,
            params
        });
        if (e.code === 0 || e.code === -2) {
            return e.result
        } else {
            Toast.info(e.msg);
            return null
        }
    } catch (err) {
        Toast.warn(err)
    }
}
export const check = async ({ params = {} }) => {
    try {
        const e = await Fetch.fetch({
            api: CartApi.check,
            params
        });
        return e.code === 0;
    } catch (err) {
        Toast.warn(err)
    }
};


export const destroy = async () => {
    try {
        await Fetch.fetch({
            api: CartApi.destroy,
        });
        return true
    } catch (err) {
        Toast.warn(err);
    }
};
export const totalNum = async () => {
    try {
        const e = await Fetch.fetch({
            api: CartApi.totalNum,
        });
        if (e.code === 0) {
            return result.total_num
        } else {
            return 0
        }
    } catch (err) {
        Toast.warn(err);
    }
};



