import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Clipboard
} from 'react-native';
import {List} from "antd-mobile-rn";
// import { updateUserInfo } from '../../actions/user';
import {PublicStyles, windowWidth} from '../../utils/style';
import Avatar from "../../components/public/avatar";
import EntypoIcon from "react-native-vector-icons/Entypo";
import {connect} from "react-redux";
import Badge from "@react-native-component/react-native-smart-badge";
import {BaseComponent} from "../../components/basecomponent";
import OrderButton from "../../components/order/button";
import {Toast} from '../../utils/function';
import {UserApi} from "../../config/api/user";
import Fetch from "../../utils/fetch";

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
     }) => (
        {
            login,
            userInfo,
            userToken,
        }
    ))
export default class AgentInfo extends BaseComponent {
    state = {
        shopUrl: null,
        agentId: null,
        totalJobNum: null,
        currentJobNum: null,
    };

    async init() {

    }

    async componentDidMount(): void {
        const {userToken} = this.props;
        const e = await Fetch.fetch({api:UserApi.agentInfo, params:{userToken}});
        if (e.code === 0) {
            this.setState({
                shopUrl: e.result.info.shopUrl,
                agentId: e.result.info.agentId,
                currentJobNum: e.result.info.currentJobNum,
                totalJobNum: e.result.info.totalJobNum,
            })
        }else{
            Toast.warn('获取代理信息出错，请重新登录后再试')
        }
    }

    render() {
        const {login, userInfo} = this.props;
        const {shopUrl, agentId, totalJobNum, currentJobNum} = this.state;
        return <View style={PublicStyles.ViewMax}>
            {
                this.top()
            }
            <ScrollView style={PublicStyles.ViewMax}>
                {login && userInfo && userInfo.userLevel !== '普通用户' ?
                    <List style={PublicStyles.ViewMax}>
                        <Item key='agentInfo'>
                            <View style={[PublicStyles.rowCenter, {justifyContent: 'space-between'}]}>
                                <Text style={PublicStyles.title}>分销商名称</Text>
                                <Text style={PublicStyles.title}>{userInfo.username}</Text>
                            </View>
                        </Item>
                        <Item key='agentLevel'>
                            <View style={[PublicStyles.rowCenter, {justifyContent: 'space-between'}]}>
                                <Text style={PublicStyles.title}>分销商级别</Text>
                                <Text style={PublicStyles.title}>{userInfo.userLevel}</Text>
                            </View>
                        </Item>
                        <Item key='shopname'>
                            <View style={[PublicStyles.rowCenter, {justifyContent: 'space-between'}]}>
                                <Text style={PublicStyles.title}>店铺名称</Text>
                                <Text style={PublicStyles.title}>{userInfo.profile.nickname}的充值店</Text>
                            </View>
                        </Item>
                        <Item key='shopUrl'>
                            <View style={[PublicStyles.rowCenter, {justifyContent: 'space-between'}]}>
                                <Text style={PublicStyles.title}>店铺域名</Text>
                            </View>
                            <View style={{marginTop: 15}}>
                                <View style={[PublicStyles.rowCenter, {justifyContent: 'space-between'}]}>
                                    <Text style={styles.text}>{shopUrl}</Text>
                                    <OrderButton text="复制" size="small" onClick={() => {
                                        Clipboard.setString(`${shopUrl}`);
                                        Toast.info('店铺域名复制成功');
                                    }}/>
                                </View>
                            </View>
                        </Item>
                        <Item key='agentId'>
                            <View style={[PublicStyles.rowCenter, {justifyContent: 'space-between'}]}>
                                <Text style={PublicStyles.title}>我的ID</Text>
                                <Text style={PublicStyles.title}>{agentId}</Text>
                            </View>
                        </Item>
                        <Item key='agentJob'>
                            <View style={[PublicStyles.rowCenter, {justifyContent: 'space-between'}]}>
                                <Text style={PublicStyles.title}>代理任务</Text>
                                <Text style={PublicStyles.title}>{currentJobNum}/{totalJobNum}单</Text>
                            </View>
                        </Item>
                    </List> : null}

            </ScrollView>

        </View>;
    }

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
    }
});
