import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {List} from "antd-mobile-rn";
// import { updateUserInfo } from '../../actions/user';
import {PublicStyles, windowWidth} from '../../utils/style';
import Avatar from "../../components/public/avatar";
import EntypoIcon from "react-native-vector-icons/Entypo";
import {connect} from "react-redux";
import Badge from "@react-native-component/react-native-smart-badge";
import {BaseComponent} from "../../components/basecomponent";
import user from "../../services/user";
import Fetch from "../../utils/fetch";
import {UserApi} from "../../config/api/user";
import {Toast} from "../../utils/function";
import store from "../../store";
import {getCartTotalNum} from "../../actions/user";

const Item = List.Item;

@connect(
    ({
         app: {
             user: {
                 login,
                 userInfo,
                 orderNum,
                 userToken,
             }
         }
     }) => (
        {
            login,
            userInfo,
            orderNum,
            userToken,
        }
    ))
export default class Agent extends BaseComponent {
    state = {
        showEarn: true,
        showMoney: false,
        agentTotalAmount: 0,
        agentTixianAmount: 0,
        totalFanQianAmount: 0,
        todayAgentEarnAmount: 0,
        monthAgentEarnAmount: 0
    };

    //获取代理账户余额信息，此处要判断条件 userLevel 不等于普通用户
    componentDidMount(): void {
        this.props.navigation.addListener(
            'didFocus',
            async () => {
                const {userToken, login} = this.props;
                if (login) {
                    const e = await Fetch.fetch({api: UserApi.agentAmount, params: {userToken}});
                    if (e.code === 0) {
                        this.setState({
                            agentTotalAmount: e.result.info.agentTotalAmount,
                            agentTixianAmount: e.result.info.agentTixianAmount,
                            totalFanQianAmount: e.result.info.totalFanQianAmount,
                            todayAgentEarnAmount: e.result.info.todayAgentEarnAmount,
                            monthAgentEarnAmount: e.result.info.monthAgentEarnAmount,
                        })
                    } else {
                        Toast.warn('获取代理信息出错，请重新登录后再试')
                    }
                }
            }
        );
    }

    // async componentDidMount(): void {
    //     const {userToken,login} = this.props;
    //     if (login){
    //         const e = await Fetch.fetch({api: UserApi.agentAmount, params: {userToken}});
    //         if (e.code === 0) {
    //             this.setState({
    //                 agentTotalAmount: e.result.info.agentTotalAmount,
    //                 agentTixianAmount: e.result.info.agentTixianAmount,
    //                 totalFanQianAmount: e.result.info.totalFanQianAmount,
    //                 todayAgentEarnAmount: e.result.info.todayAgentEarnAmount,
    //                 monthAgentEarnAmount: e.result.info.monthAgentEarnAmount,
    //             })
    //         } else {
    //             Toast.warn('获取代理信息出错，请重新登录后再试')
    //         }
    //     }
    // }

    render() {
        const {login, userInfo, navigation} = this.props;
        return <View style={PublicStyles.ViewMax}>
            {
                this.top()
            }
            {
                this.mid()
            }
            {
                this.bot()
            }
        </View>;
    };

    top() {
        const {login, userInfo, navigation} = this.props;
        return (
            <TouchableOpacity
                style={[PublicStyles.rowBetweenCenter, styles.topWarp, {backgroundColor: '#fedd04'}]}
                activeOpacity={.8}
                onPress={() => {
                    navigation.navigate(login ? "UserInfo" : "UserLogin")
                }}
            >
                <View style={PublicStyles.rowCenter}>
                    <Avatar
                        avatar={login && userInfo && userInfo.profile ? userInfo.profile.avatar : null}
                        size={60}
                        otherStyle={{
                            marginRight: 15,
                        }}
                    />
                    <View style={{flexDirection: 'column'}}>
                        <Text style={[PublicStyles.boldTitle, {fontSize: 18}]}>
                            {
                                login && userInfo && userInfo.profile ? userInfo.profile.nickname : "点击登录"
                            }
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[PublicStyles.title, {fontSize: 14}]}>
                                {
                                    login && userInfo ? userInfo.userLevel : ""
                                }
                            </Text>
                            <Text style={[PublicStyles.title, {fontSize: 14}]}>
                                {
                                    login && userInfo && userInfo.userLevelDiscount !== 1 ? `${userInfo.userLevelDiscount * 10}折专享` : ""
                                }
                            </Text>
                            <Text style={[PublicStyles.title, {fontSize: 14, marginLeft: 10}]}>
                                {
                                    login && userInfo ? `余额: ${userInfo.balance}` : ""
                                }
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={PublicStyles.rowCenter}>
                    <Text style={PublicStyles.descFour9}>设置</Text>
                    <EntypoIcon
                        name="chevron-small-right"
                        size={24}
                        color="#CCCCCC"
                    />
                </View>
            </TouchableOpacity>
        )
    }

    mid() {
        const {orderNum, userInfo, navigation, login} = this.props;
        const {showEarn, showMoney, agentTotalAmount, agentTixianAmount, monthAgentEarnAmount, todayAgentEarnAmount, totalFanQianAmount} = this.state;
        return <View>
            {login && userInfo && userInfo.userLevel !== '普通用户' ? <View style={{marginLeft: 15, marginRight: 15}}>
                    <View style={{flexDirection: 'row'}}>
                        {showEarn ? <View style={styles.myshouyiActive}>
                            <Text onPress={() => {
                                this.setState({showEarn: true, showMoney: false})
                            }}>我的收益</Text>
                        </View> : <View style={styles.myshouyi}>
                            <Text onPress={() => {
                                this.setState({showEarn: true, showMoney: false})
                            }}>我的收益</Text>
                        </View>}
                        {showMoney ? <View style={styles.myshouyiActive}>
                            <Text onPress={() => {
                                this.setState({showEarn: false, showMoney: true})
                            }}>我的资金</Text>
                        </View> : <View style={styles.myshouyi}>
                            <Text onPress={() => {
                                this.setState({showEarn: false, showMoney: true})
                            }}>我的资金</Text>
                        </View>}

                    </View>
                    {showEarn ?
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15,}}>
                            <View style={styles.columnCenter}>
                                <Text style={{color: '#777777'}}>今日收益</Text>
                                <Text style={{color: '#ff0000'}}>￥:{todayAgentEarnAmount}</Text>
                            </View>
                            <View style={styles.columnCenter}>
                                <Text style={{color: '#777777'}}>匹配收益</Text>
                                <Text style={{color: '#ff0000'}}>￥:{totalFanQianAmount}</Text>
                            </View>
                            <View style={styles.columnCenter}>
                                <Text style={{color: '#777777'}}>本月收益</Text>
                                <Text style={{color: '#ff0000'}}>￥:{monthAgentEarnAmount}</Text>
                            </View>
                        </View> : null}
                    {showMoney ?
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15}}>
                            <View style={styles.columnCenter}>
                                <Text style={{color: '#777777'}}>我的资金</Text>
                                <Text style={{color: '#ff0000'}}>￥:{agentTotalAmount}</Text>
                            </View>
                            <View style={styles.columnCenter}>
                                <Text style={{color: '#777777'}}>可提现资金</Text>
                                <Text style={{color: '#ff0000'}}>￥:{agentTixianAmount}</Text>
                            </View>
                        </View> : null}

                </View> :
                <View>
                    <Item
                        key='升级为代理会员'
                        arrow="horizontal"
                        onClick={() => login ? navigation.navigate("ChargeItemPage", {
                            id: 15,
                            cateType: 'member'
                        }) : navigation.navigate("UserLogin")}
                    >
                        <View style={PublicStyles.rowCenter}>
                            <Text style={PublicStyles.title}>升级成为代理会员</Text>
                        </View>
                    </Item>
                </View>
            }
        </View>
    };

    bot() {
        const {navigation, login, userInfo, showVersionUpdate} = this.props;
        let botList = [
            {
                img: require('../../images/agent/agent.png'),
                title: '账户信息',
                path: "AgentInfo"
            }, {
                img: require('../../images/user/tixian.png'),
                title: '余额提现',
                path: "BalanceTixian"
            }, {
                img: require('../../images/user/tixianjilu.png'),
                title: '提现记录',
                path: "BalanceTixianRecords"
            }, {
                img: require('../../images/user/record.png'),
                title: '资金记录',
                path: "BalanceChangeRecords"
            }, {
                img: require('../../images/tab/tab2.png'),
                title: '订单管理',
                path: "AgentOrderList"
            }
        ];
        {
            userInfo ? botList.push({
                img: require('../../images/user/discount.png'),
                title: '自定义显示折扣',
                path: "CustomDiscount"
            }) : botList
        }
        return (
            <ScrollView style={PublicStyles.ViewMax}>
                {/*{login && userInfo && userInfo.userLevel !== '普通用户' ?*/}
                {/*    <View>*/}
                {/*        <Item*/}
                {/*            key='updateUser'*/}
                {/*            arrow="horizontal"*/}
                {/*            onClick={() => navigation.navigate("ChargeItemPage", {id: 15, cateType: 'member'})}*/}
                {/*        >*/}
                {/*            <View style={PublicStyles.rowCenter}>*/}
                {/*                <Image style={styles.botImg} source={require('../../images/tab/tab4.png')}/>*/}
                {/*                <Text style={PublicStyles.title}>升级账户</Text>*/}
                {/*            </View>*/}
                {/*        </Item>*/}
                {/*    </View> : null}*/}
                {login && userInfo && userInfo.userLevel !== '普通用户' ?
                    <List style={PublicStyles.ViewMax}>
                        {
                            botList.map((item, index) => (
                                <Item
                                    key={index}
                                    arrow="horizontal"
                                    onClick={() => navigation.navigate(login ? item.path : 'UserLogin')}
                                >
                                    <View style={PublicStyles.rowCenter}>
                                        <Image style={styles.botImg} source={item.img}/>
                                        <Text style={PublicStyles.title}>{item.title}</Text>
                                    </View>
                                </Item>
                            ))
                        }
                    </List> : null}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    topWarp: {
        height: 100,
        paddingHorizontal: 15,
        backgroundColor: '#fff'
    },
    midList: {
        flexDirection: 'row',
        alignItems: "center",
        height: 75,
        backgroundColor: '#fff'
    },
    midItem: {
        flex: 1,
        alignItems: "center"
    },
    midImg: {
        width: 22,
        height: 22,
        marginBottom: 9
    },
    botImg: {
        width: 22,
        height: 22,
        marginRight: 10
    },
    fashopCopyright: {
        bottom: 0,
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fashopCopyrightBody: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15
    },
    fashopCopyrightImg: {
        height: 16,
        width: 50,
        marginRight: 5
    },
    fashopCopyrightText: {
        color: '#cccccc',
        fontSize: 12,
        lineHeight: 12,
    },
    myshouyi: {
        padding: 15,
    },
    myshouyiActive: {
        padding: 15,
        borderStyle: 'solid',
        borderBottomWidth: 3,
        borderBottomColor: '#fedd04'
    },
    columnCenter: {
        paddingTop: 15,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
