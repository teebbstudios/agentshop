import {Toast} from "../../utils/function";
import Fetch from '../../utils/fetch'
import {ChargeApi} from "../../config/api/charge";
import {BuyCreateOrderInterface} from "../../interface/buyCreateOrder";

export const chargeOrderCreate = async ({params = {}}) => {
    try {
        const e = await Fetch.fetch({
            api: ChargeApi.chargeOrderCreate,
            params
        });
        if (e.code === 0) {
            return new BuyCreateOrderInterface(e.result);
        } else {
            Toast.warn(e.msg);
            return null;
        }
    } catch (err) {
        Toast.warn(err)
    }
};




