import {
    StyleSheet,
    ScrollView,
    View,
} from 'react-native';
import fa from '../../utils/fa'
import OrderModel from '../../models/order'
import React, {Component} from 'react';
import {Modal, WhiteSpace} from "antd-mobile-rn";
import {
    OrderStateCard,
    OrderAddress,
    OrderGoodsList,
    OrderBaseInfo,
    OrderCostList,
    OrderFooterAction
} from '../../components'
import {connect} from "react-redux";

const orderModel = new OrderModel()

@connect(
    ({
         app: {
             user: {
                 login,
                 userInfo,
                 userToken
             }
         }
     }) => ({
        login,
        userInfo,
        userToken
    }),
)
export default class OrderDetail extends Component {
    state = {
        id: null,
        orderInfo: null,
        orderLog: null,
    };

    onRefund(goodsInfo) {
        const orderInfo = this.state.orderInfo;
        // 根据类型跳转到是退款还是退款退货  订单状态：0(已取消)10(默认):未付款;20:已付款;30:已发货;40:已收货;    多少天后不可退的业务逻辑
        if (orderInfo.state === 20) {
            // 直接跳转到申请发货
            this.props.navigation.navigate('RefundServiceApply', {
                order_goods_id: goodsInfo.id,
                refund_type: 1
            })

        } else if (orderInfo.state === 30 || orderInfo.state === 40) {
            // 选择是退款还是退款并退货
            this.props.navigation.navigate('RefundServiceType', {
                order_goods_id: goodsInfo.id,
            })
        }
    }

    onRefundDetail(goodsInfo) {
        this.props.navigation.navigate('RefundDetail', {
            id: goodsInfo.refund_id,
        })
    }


    componentWillMount() {
        this.setState({
            id: this.props.navigation.getParam('id')
        }, () => {
            this.props.navigation.addListener(
                'didFocus', async () => {
                    this.init()
                }
            );
        })

    }

    async init() {
        const {userToken} = this.props;
        const result = await orderModel.detail({id: this.state.id, userToken});
        if (result) {
            this.setState({
                orderInfo: result.info,
                // orderLog: result.order_log
            })
        }
    }

    onGoodsDetail(goodsInfo) {
        const {orderInfo} = this.state;
        if (orderInfo.cate_type === 'goods')
        {
            this.props.navigation.navigate('GoodsDetail', {
                id: goodsInfo.goods_id,
            })
        }
    }

    async onCancel() {
        Modal.alert('您确认取消吗？状态修改后不能变更', null, [
            {text: '取消', onPress: () => console.log('cancel'), style: 'cancel'},
            {
                text: '确认', onPress: async () => {
                    const {orderInfo} = this.state
                    const result = await orderModel.cancel({
                        'id': orderInfo.id,
                    });
                    if (result) {
                        this.init();
                        this.updateListRow(orderInfo.id)
                    } else {
                        fa.toast.show({
                            title: fa.code.parse(orderModel.getException().getCode())
                        })
                    }
                }
            }
        ])
    }

    onEvaluate() {
        const {orderInfo} = this.state;
        this.props.navigation.navigate('EvaluateList', {
            order_id: orderInfo.id,
        })
    }

    async onLogistics(orderInfo) {
        const e = await orderModel.logistics({
            id: orderInfo.id
        });
        if (e) {
            this.props.navigation.navigate('PublicWebView', {
                title: '物流信息',
                url: e.info.url
            })
        } else {
            fa.toast.show({
                title: fa.code.parse(orderModel.getException().getCode())
            })
        }
    }

    async onReceive() {
        Modal.alert('您确认收货吗？状态修改后不能变更', null, [
            {text: '取消', onPress: () => console.log('cancel'), style: 'cancel'},
            {
                text: '确认', onPress: async () => {
                    const {orderInfo} = this.state;
                    const result = await orderModel.confirmReceipt({
                        'id': orderInfo.id,
                    });
                    if (result) {
                        this.init();
                        this.updateListRow(orderInfo.id)
                    } else {
                        fa.toast.show({
                            title: fa.code.parse(orderModel.getException().getCode())
                        })
                    }
                }
            }
        ])
    }

    async onPay() {
        const {orderInfo} = this.state;
        this.props.navigation.navigate('Pay', {
            orderInfo,
            pay_amount: parseFloat(orderInfo.amount)
        })
    }

    updateListRow = () => {
        const {id} = this.state;
        if (id > 0) {
            this.props.navigation.dispatch(StackActions.pop({n: 1}));
            const updateListRow = this.props.navigation.getParam('updateListRow');
            if (typeof updateListRow === 'function') {
                updateListRow(id)
            }
        }
    };


    render() {
        const {orderInfo} = this.state;
        return orderInfo ? <ScrollView>
            <View style={styles.main}>
                <View style={styles.item}>
                    <OrderStateCard
                        orderState={orderInfo.state}
                        expireSeconds={1000}
                        cost={orderInfo.amount}
                    />
                    {orderInfo.cate_type === 'goods' ? <OrderAddress
                        name={orderInfo.extend_order_extend.reciver_name}
                        phone={orderInfo.extend_order_extend.receiver_phone}
                        address={orderInfo.extend_order_extend.reciver_name}
                    /> : null}
                    <WhiteSpace size="sm"/>
                </View>

                <View style={styles.item}>
                    <OrderGoodsList
                        orderInfo={orderInfo}
                        goodsList={orderInfo.extend_order_goods}
                        onGoodsDetail={({goodsInfo}) => {
                            this.onGoodsDetail(goodsInfo)
                        }}
                        onRefund={({goodsInfo}) => {
                            this.onRefund(goodsInfo)
                        }}
                        onRefundDetail={({goodsInfo}) => {
                            this.onRefundDetail(goodsInfo)
                        }}
                    />
                    <WhiteSpace size="sm"/>
                </View>
                <View style={styles.item}>
                    <OrderBaseInfo
                        orderInfo={orderInfo}
                        orderNumber={orderInfo.sn}
                        createTime={orderInfo.create_time}
                        payment={orderInfo.pay_name}
                        payTime={orderInfo.payment_time}
                        message={orderInfo.extend_order_extend.message ? orderInfo.extend_order_extend.message : '无'}
                    />
                    <WhiteSpace size="sm"/>
                </View>
                <View style={styles.item}>
                    <OrderCostList
                        goodsTotal={orderInfo.goods_amount}
                        freight={orderInfo.freight_fee}
                        totalCost={orderInfo.amount}/>
                    <OrderFooterAction
                        orderInfo={orderInfo}
                        orderState={orderInfo.state}
                        showDelBtn={false}
                        // showEvaluateBtn={orderInfo.if_evaluate}
                        showPayBtn={orderInfo.if_pay}
                        // showLogisticsBtn={orderInfo.state === 30 || orderInfo.state === 40}
                        // showReceiveBtn={orderInfo.if_receive}
                        onPay={() => {
                            this.onPay()
                        }}
                        onReceive={() => {
                            this.onReceive()
                        }}
                        onCancel={() => {
                            this.onCancel()
                        }}
                        onEvaluate={() => {
                            this.onEvaluate()
                        }}
                        onLogistics={() => {
                            this.onLogistics()
                        }}
                    />
                </View>
            </View>
        </ScrollView> : null
    }
}
const styles = StyleSheet.create({
    main: {
        backgroundColor: '#f8f8f8',
    },
    item: {}
})
