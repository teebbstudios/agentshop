import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView
} from 'react-native';
import Fetch from '../../utils/fetch';
import {Toast} from "../../utils/function";
import {PublicStyles, ThemeStyle} from '../../utils/style'
import {List, NoticeBar, Radio, Button} from "antd-mobile-rn";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Alipay from "react-native-yunpeng-alipay";
import {sendWechatAuthRequest, wechatPay} from "../../actions/app/wechat";
import {BuyApi} from '../../config/api/buy'
import {getCartTotalNum, getOrderStateNum, updateUserInfo} from "../../actions/user";

const Item = List.Item;
const RadioItem = Radio.RadioItem;

@connect(({
              app: {
                  wechat: {
                      isWXAppInstalled
                  },
                  user: {
                      userToken
                  }
              },
          }) => ({
    isWXAppInstalled,
    userToken
}))
export default class Pay extends Component {
    state = {
        center: "",
        wait: 7200,
        payment_code: 'alipay'
    };

    async componentDidMount() {
        const {navigation} = this.props;
        const {orderInfo} = navigation.state.params;
        let wait = orderInfo.payable_time - new Date().getTime() / 1000;
        this.setState({
            wait
        });
        this.timer = window.setInterval(() => {
            let hour = 0;
            let minute = 0;
            let second = 0;
            if (wait > 0) {
                let day = Math.floor(wait / (60 * 60 * 24));
                hour = Math.floor(wait / (60 * 60)) - (day * 24);
                minute = Math.floor(wait / 60) - (day * 24 * 60) - (hour * 60);
                second = Math.floor(wait) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
            }
            if (hour <= 9) hour = '0' + hour;
            if (minute <= 9) minute = '0' + minute;
            if (second <= 9) second = '0' + second;
            if (wait === 0) {
                window.clearInterval(this.timer);
                this.setState({
                    center: '超时',
                });
            } else {
                --wait;
                this.setState({
                    center: `${hour}小时${minute}分钟${second}秒`
                });
            }
        }, 1000)
    }

    componentWillUnmount() {
        this.timer && window.clearInterval(this.timer)
    }

    render() {
        const {center, payment_code} = this.state;
        const {isWXAppInstalled, navigation} = this.props;
        const {orderInfo, pay_amount} = navigation.state.params;
        const payment_list = [
            // {type: "wechat", name: "微信支付"},
            {type: "alipay", name: "支付宝支付"},
        ];
        return (
            <View style={PublicStyles.ViewMax}>
                <ScrollView>
                    <NoticeBar
                        icon={
                            <AntDesignIcon
                                color="#FE7C04"
                                size={16}
                                name="exclamationcircleo"
                            />
                        }
                        style={{backgroundColor: '#FFF7E7'}}
                    >
                        <Text style={{color: "#FE7C04"}}>
                            请在 {center} 内完成支付
                        </Text>
                    </NoticeBar>
                    <View style={styles.totalView}>
                        <Text style={[PublicStyles.boldTitle, {fontSize: 14, marginBottom: 10}]}>此次订单共需支付</Text>
                        <Text style={[PublicStyles.boldTitle, {color: ThemeStyle.ThemeColor}]}>
                            ￥
                            <Text style={{fontSize: 25}}>{pay_amount}</Text>
                        </Text>
                    </View>
                    <List renderHeader={() => "选择支付方式"}>
                        {
                            payment_list.map(i => {
                                // const disabled = i.type==='wechat'&&isWXAppInstalled===false
                                return (
                                    <RadioItem
                                        key={i.type}
                                        checked={payment_code === i.type}
                                        onChange={() => this.setState({payment_code: i.type})}
                                        radioStyle={{tintColor: ThemeStyle.ThemeColor}}
                                        // disabled={disabled}
                                        // extra={disabled && <Text style={{ fontSize: 14, color: 'red' }}>不支持此支付方式</Text>}
                                    >
                                        {i.name}
                                    </RadioItem>
                                )
                            })
                        }
                    </List>
                </ScrollView>
                <SafeAreaView>
                    <Button
                        style={{borderRadius: 0}}
                        type='primary'
                        size="large"
                        onClick={payment_code === "wechat" ? this.wxPay : this.aliPay}
                    >
                        {
                            payment_code === 'wechat' ? `微信支付￥${pay_amount}` :
                                payment_code === 'alipay' ? `支付宝支付￥${pay_amount}` : `￥${pay_amount}`
                        }
                    </Button>
                </SafeAreaView>
            </View>
        )
    }

    wxPay = async () => {
        const {dispatch, navigation, userToken} = this.props;
        const {orderInfo} = navigation.state.params;
        const {tokenData} = await sendWechatAuthRequest();
        const params = {
            userToken,
            order_type: 'goods_buy',
            pay_sn: orderInfo.pay_sn,
            payment_code: 'wechat',
            openid: tokenData.openid,
            payment_channel: 'wechat_app' // 支付渠道 "wechat"  "wechat_mini" "wechat_app"
        };
        dispatch(wechatPay({params, successCallback: this.paySuccess}))
    };
    aliPay = async () => {
        const {dispatch, navigation, userToken} = this.props;
        const {orderInfo} = navigation.state.params;
        const params = {
            userToken,
            order_type: 'goods_buy',
            pay_sn: orderInfo.pay_sn,
            payment_code: 'alipay',
            payment_channel: 'alipay_app' // 支付渠道 "wechat"  "wechat_mini" "wechat_app" "alipay_app"
        };
        const {result} = await Fetch.request(BuyApi.pay, {params});

        Alipay.pay(result.content)
            .then((AlipayData) => {
                console.log(AlipayData);
                this.paySuccess()
            }, (err) => {
                console.log(err);
                //this.paySuccess();
                Toast.warn('支付失败，请到订单列表再次付款。');
                navigation.navigate('OrderList')

            })
    };
    paySuccess = async () => {
        const {payment_code} = this.state;
        const {navigation, dispatch, userToken} = this.props;
        const {pay_amount, orderInfo} = navigation.state.params;
        navigation.replace('PaySuccess', {
            pay_amount,
            pay_type: payment_code === 'wechat' ? `微信支付` : payment_code === 'alipay' ? `支付宝支付` : ``,
            id: orderInfo.order_id || orderInfo.id,
            userToken,
        });

        //付款后更新订单数量 更新用户信息
        await dispatch(updateUserInfo(userToken));
        await dispatch(getOrderStateNum(userToken));
        await dispatch(getCartTotalNum(userToken));

    }
    // payFailure() {

    // }
}

const styles = StyleSheet.create({
    totalView: {
        backgroundColor: '#fff',
        paddingVertical: 24,
        alignItems: 'center',
    }
});
