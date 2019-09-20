import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text, Linking
} from 'react-native';
import fa from '../../utils/fa'
import OrderModel from '../../models/order'
import {List, Modal} from "antd-mobile-rn";
import {PublicStyles, ThemeStyle} from '../../utils/style';
import {OrderCard, OrderCardHeader, OrderCardGoods, OrderCardFooter} from '../../components'
import FlatList from "../../components/flatList";
import {OrderApi} from "../../config/api/order";
import {DefaultTabBar} from "react-native-scrollable-tab-view";
import ScrollableTabView from "react-native-scrollable-tab-view";
import {connect} from "react-redux";
import {UserApi} from "../../config/api/user";
import TimeFormat from "../../components/fa/timeFormat";
import Badge from "@react-native-component/react-native-smart-badge";
import Fetch from "../../utils/fetch";
import {Toast} from "../../utils/function";

const orderModel = new OrderModel();
const Item = List.Item;

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
export default class AgentOrderList extends Component {
    state = {
        state_type: null,
        agent_total_order: 0,
    };

    async componentWillMount() {
        const state_type = this.props.navigation.getParam('state_type')
        if (state_type) {
            this.setState({
                state_type
            })
        }
        //获取订单总数
        const {userToken, login} = this.props;
        if (login) {
            const e = await Fetch.fetch({api: UserApi.agentTotalOrderNum, params: {userToken}});
            if (e.code === 0) {
                this.setState({
                    agent_total_order: e.result.total_order_num,
                })
            } else {
                Toast.warn('获取代理信息出错，请重新登录后再试')
            }
        }
    }

    goDetail(id) {
        this.props.navigation.navigate('OrderDetail', {id})
    }

    async onCancel(orderInfo) {
        const {userToken} = this.props;
        Modal.alert('您确认取消吗？状态修改后不能变更', null, [
            {text: '取消', onPress: () => console.log('cancel'), style: 'cancel'},
            {
                text: '确认', onPress: async () => {
                    const result = await orderModel.cancel({
                        'id': orderInfo.id,
                        userToken
                    });
                    if (result === true) {
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
            // {
            //     state_type: 'state_new',
            //     tabLabel: '待付款'
            // },
            // {
            //     state_type: 'state_pay',
            //     tabLabel: '待发货'
            // },
            // {
            //     state_type: 'state_send',
            //     tabLabel: '待收货'
            // },
            // {
            //     state_type: 'state_success',
            //     tabLabel: '已完成'
            // }
        ];
        const {state_type, agent_total_order} = this.state;
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
                {/*<ScrollableTabView*/}
                {/*    style={{backgroundColor: '#fff', flex: 0}}*/}
                {/*    initialPage={tabIndex}*/}
                {/*    renderTabBar={() =>*/}
                {/*        <DefaultTabBar*/}
                {/*            style={{*/}
                {/*                borderWidth: 0,*/}
                {/*                borderColor: 'rgba(0,0,0,0)'*/}
                {/*            }}*/}
                {/*            tabStyle={{paddingBottom: 0}}*/}
                {/*        />*/}
                {/*    }*/}
                {/*    tabBarActiveTextColor={ThemeStyle.ThemeColor}*/}
                {/*    tabBarInactiveTextColor='#666'*/}
                {/*    tabBarUnderlineStyle={{*/}
                {/*        backgroundColor: `${ThemeStyle.ThemeColor}`,*/}
                {/*        height: 3,*/}
                {/*        borderRadius: 4,*/}
                {/*    }}*/}
                {/*    tabBarTextStyle={{}}*/}
                {/*    onChangeTab={({i}) => {*/}
                {/*        this.FlatList.setFetchParams({*/}
                {/*            state_type: i === 0 ? null : tabList[i].state_type,*/}
                {/*            userToken: userToken*/}
                {/*        })*/}
                {/*    }}*/}
                {/*>*/}
                {/*    {*/}
                {/*        tabList.map((item, index) => (*/}
                {/*            <View*/}
                {/*                key={index}*/}
                {/*                tabLabel={item.tabLabel}*/}
                {/*            />*/}
                {/*        ))*/}
                {/*    }*/}
                {/*</ScrollableTabView>*/}
                <View style={{backgroundColor: '#fff',padding: 15, borderBottomWidth: 5, borderBottomColor: '#f0f0f0'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={PublicStyles.title}>您的总订单数：</Text>
                        <Text style={{color: 'red', fontWeight: 'bold'}}>{agent_total_order}单</Text>
                    </View>
                </View>
                <FlatList
                    ref={e => this.FlatList = e}
                    keyExtractor={e => String(e.id)}
                    api={UserApi.agentOrderList}
                    fetchParams={params}
                    renderItem={({item}) => (
                        <OrderCard key={`order_${item.order_sn}`}>
                            <View style={styles.orderCardHeader}>
                                <View style={styles.left}>
                                    <Text style={styles.leftText}>下单时间：<TimeFormat value={item.create_time}/></Text>
                                </View>
                                <View style={styles.right}>
                                    {item.state === 0 ? <Text style={styles.state0}>已取消</Text> : null}
                                    {item.state === 10 ? <Text style={styles.state10}>等待付款</Text> : null}
                                    {item.state === 20 ? <Text style={styles.state20}>待发货</Text> : null}
                                    {item.state === 30 ? <Text style={styles.state30}>已发货</Text> : null}
                                    {item.state === 40 ? <Text style={styles.state40}>已完成</Text> : null}
                                </View>
                            </View>
                            <OrderCardGoods
                                orderId={item.id}
                                goodsList={item.extend_order_goods}
                            />
                            <View style={styles.header}>
                                {/*<Text style={styles.number}>共{item.goods_num}件商品</Text>*/}
                                {/*<Text style={styles.priceDesc}>实付款：</Text>*/}
                                {/*<Text style={styles.price}>¥{parseFloat(item.amount)}</Text>*/}
                                <View style={{paddingRight: 15, flexDirection: 'row'}}>
                                    <Text style={styles.priceDesc}>购买人:</Text>
                                    <Text style={styles.priceDesc}>游客</Text>
                                </View>
                            </View>
                        </OrderCard>
                    )}
                />
            </View>
        );
    }

}
const styles = StyleSheet.create({
    orderCardHeader: {
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#F8F8F8",
        flexDirection: 'row'
    },
    header: {
        textAlign: "right",
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: 'row'
    },
    number: {
        fontSize: 14,
        color: "#333333",

    },
    priceDesc: {
        fontSize: 14,
        color: "#333333",
        marginLeft: 10
    },
    price: {
        fontSize: 16,
        color: "#333333",
        fontWeight: "800",

    },
    left: {
        alignItems: "center"
    },
    leftText: {
        fontSize: 14,
        color: "#999999",
        lineHeight: 14,
        height: 14,
    },
    state0: {
        color: "red"
    },
    state10: {
        color: "red"
    },
    state20: {
        color: "red"
    },
    state30: {
        color: "red"
    },
    state40: {
        color: "red"
    }
});
