import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import fa from '../../utils/fa'
import OrderModel from '../../models/order'
import {Modal} from "antd-mobile-rn";
import {PublicStyles, ThemeStyle} from '../../utils/style';
import {OrderCard, OrderCardHeader, OrderCardGoods, OrderCardFooter} from '../../components'
import FlatList from "../../components/flatList";
import {OrderApi} from "../../config/api/order";
import {DefaultTabBar} from "react-native-scrollable-tab-view";
import ScrollableTabView from "react-native-scrollable-tab-view";
import {connect} from "react-redux";
import {getCartTotalNum, getOrderStateNum} from "../../actions/user";

const orderModel = new OrderModel()

@connect(
    ({
         app: {
             user: {
                 login,
                 userInfo,
                 userToken,
             }
         }
     }) => ({
        login,
        userInfo,
        userToken,
    }),
)
export default class OrderList extends Component {
    state = {
        state_type: null,
    };

    async componentWillMount() {
        const state_type = this.props.navigation.getParam('state_type')
        if (state_type) {
            this.setState({
                state_type
            })
        }
    }

    goDetail(id) {
        this.props.navigation.navigate('OrderDetail', {id})
    }

    async onCancel(orderInfo) {
        const {userToken, dispatch} = this.props;
        Modal.alert('您确认取消吗？状态修改后不能变更', null, [
            {text: '取消', onPress: () => console.log('cancel'), style: 'cancel'},
            {
                text: '确认', onPress: async () => {
                    const result = await orderModel.cancel({
                        'id': orderInfo.id,
                        userToken
                    });
                    if (result === true) {
                        this.updateListRow(orderInfo.id);
                        await dispatch(getOrderStateNum(userToken));
                    } else {
                        fa.toast.show({
                            title: fa.code.parse(orderModel.getException().getCode())
                        })
                    }
                }
            }
        ])

    }

    onEvaluate(orderInfo) {
        this.props.navigation.navigate('OrderDetail', {order_id: orderInfo.id})
    }

    async onReceive(orderInfo) {
        Modal.alert('您确认收货吗？状态修改后不能变更', null, [
            {text: '取消', onPress: () => console.log('cancel'), style: 'cancel'},
            {
                text: '确认', onPress: async () => {
                    const result = await orderModel.confirmReceipt({
                        'id': orderInfo.id,
                    })
                    if (result) {
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

    async onPay(orderInfo) {
        this.props.navigation.navigate('Pay', {
            orderInfo,
            pay_amount: parseFloat(orderInfo.amount)
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

    updateListRow = async (id) => {
        this.FlatList.manuallyRefresh()
    };

    render() {
        const tabList = [
            {
                state_type: 'all',
                tabLabel: '全部'
            },
            {
                state_type: 'state_new',
                tabLabel: '待付款'
            },
            {
                state_type: 'state_pay',
                tabLabel: '待发货'
            },
            {
                state_type: 'state_send',
                tabLabel: '待收货'
            },
            {
                state_type: 'state_success',
                tabLabel: '已完成'
            }
        ];
        const {state_type} = this.state;
        const {userToken} = this.props;
        let params = {
            userToken
        };
        if (state_type) {
            params['state_type'] = state_type;

        }
        const findResult = tabList.findIndex((row) => row.state_type === state_type);
        const tabIndex = findResult > -1 ? findResult : 0;
        return (
            <View style={[PublicStyles.ViewMax]}>
                <ScrollableTabView
                    style={{backgroundColor: '#fff', flex: 0}}
                    initialPage={tabIndex}
                    renderTabBar={() =>
                        <DefaultTabBar
                            style={{
                                borderWidth: 0,
                                borderColor: 'rgba(0,0,0,0)'
                            }}
                            tabStyle={{paddingBottom: 0}}
                        />
                    }
                    tabBarActiveTextColor={ThemeStyle.ThemeColor}
                    tabBarInactiveTextColor='#666'
                    tabBarUnderlineStyle={{
                        backgroundColor: `${ThemeStyle.ThemeColor}`,
                        height: 3,
                        borderRadius: 4,
                    }}
                    tabBarTextStyle={{}}
                    onChangeTab={({i}) => {
                        this.FlatList.setFetchParams({
                            state_type: i === 0 ? null : tabList[i].state_type,
                            userToken: userToken
                        })
                    }}
                >
                    {
                        tabList.map((item, index) => (
                            <View
                                key={index}
                                tabLabel={item.tabLabel}
                            />
                        ))
                    }
                </ScrollableTabView>
                <FlatList
                    ref={e => this.FlatList = e}
                    keyExtractor={e => String(e.id)}
                    api={OrderApi.list}
                    fetchParams={params}
                    renderItem={({item}) => (
                        <OrderCard key={`card_${item.order_sn}`}>
                            <OrderCardHeader
                                orderId={item.id}
                                state={item.state}
                                sn={item.sn}
                            />
                            <OrderCardGoods
                                orderId={item.id}
                                goodsList={item.extend_order_goods}
                                onClick={() => {
                                    this.goDetail(item.id)
                                }}
                            />
                            <OrderCardFooter
                                orderInfo={item}
                                orderId={item.id}
                                goodsNumber={item.goods_num}
                                totalCost={parseFloat(item.amount)}
                                // showEvaluateBtn={item.if_evaluate}
                                showPayBtn={item.if_pay}
                                // showReceiveBtn={item.if_receive}
                                // showLogisticsBtn={item.state === 30 || item.state === 40}
                                showCancelBtn={item.if_pay}
                                onPay={() => {
                                    this.onPay(item)
                                }}
                                onReceive={() => {
                                    this.onReceive(item)
                                }}
                                onCancel={() => {
                                    this.onCancel(item)
                                }}
                                onEvaluate={() => {
                                    this.onEvaluate(item)
                                }}
                                onLogistics={() => {
                                    this.onLogistics(item)
                                }}
                            />
                        </OrderCard>
                    )}
                />
            </View>
        );
    }

}
const styles = StyleSheet.create({})
