import Interface from "../utils/interface";
import Exception from "../utils/exception";

export class BuyCreateOrderInterface extends Interface {
    order_id;
    pay_sn;
    payable_time;
    total_amount;
    constructor(param) {
        console.log(param);
        super();
        try {
            this.order_id = param.order_id;
            this.pay_sn = param.pay_sn;
            this.payable_time = param.payable_time;
            this.total_amount = param.total_amount;
        } catch (e) {
            throw new Exception(e , 'BuyCreateOrderInterface interface attribute error')
        }
    }
}
export class BuyPayResultInterface extends Interface {
    timeStamp;
    nonceStr;
    package;
    signType;
    paySign;
    constructor(param) {
        super()
        try {
            this.timeStamp = param.timeStamp
            this.nonceStr = param.nonceStr
            this.package = param.package
            this.signType = param.signType
            this.paySign = param.paySign
        } catch (e) {
            throw new Exception(e, 'BuyPayResultInterface interface attribute error')
        }
    }
}

