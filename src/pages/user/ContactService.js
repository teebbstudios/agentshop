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
import {ShopApi} from "../../config/api/shop";

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
export default class ContactService extends BaseComponent {
    state = {
        serviceTel: null,
        serviceWechat1: null,
        serviceWechat2: null,
        serviceWechat3: null,
        tousuTel: null,
    };

    async componentDidMount(): void {
        const e = await Fetch.fetch({api: ShopApi.services, params: {}});
        if (e.code === 0) {
            this.setState({
                serviceTel: e.result.info.serviceTel,
                serviceWechat1: e.result.info.serviceWechat1,
                serviceWechat2: e.result.info.serviceWechat2,
                serviceWechat3: e.result.info.serviceWechat3,
                tousuTel: e.result.info.tousuTel,
            })
        } else {
            Toast.warn('获取客服信息出错，请稍后再试。')
        }
    }

    render() {
        const {serviceTel, serviceWechat1, serviceWechat2, serviceWechat3, tousuTel} = this.state;
        return <View style={PublicStyles.ViewMax}>
            <ScrollView style={PublicStyles.ViewMax}>
                <List style={PublicStyles.ViewMax}>
                    {serviceTel ?
                        <Item key='serviceTel'>
                            <View style={[PublicStyles.rowCenter, {justifyContent: 'space-between'}]}>
                                <Text style={PublicStyles.title}>客服电话</Text>
                                <Text style={PublicStyles.title}>{serviceTel}</Text>
                            </View>
                        </Item> : null}
                    {serviceWechat1 ?
                        <Item key='serviceWechat1'>
                            <View style={[PublicStyles.rowCenter, {justifyContent: 'space-between'}]}>
                                <Text style={PublicStyles.title}>客服微信</Text>
                                <Text style={PublicStyles.title}>{serviceWechat1}</Text>
                            </View>
                        </Item> : null}
                    {serviceWechat2 ?
                        <Item key='serviceWechat2'>
                            <View style={[PublicStyles.rowCenter, {justifyContent: 'space-between'}]}>
                                <Text style={PublicStyles.title}>客服微信</Text>
                                <Text style={PublicStyles.title}>{serviceWechat2}</Text>
                            </View>
                        </Item> : null}
                    {serviceWechat3 ?
                        <Item key='serviceWechat3'>
                            <View style={[PublicStyles.rowCenter, {justifyContent: 'space-between'}]}>
                                <Text style={PublicStyles.title}>客服微信</Text>
                                <Text style={PublicStyles.title}>{serviceWechat3}</Text>
                            </View>
                        </Item> : null}
                    {tousuTel ?
                        <Item key='tousuTel'>
                            <View style={[PublicStyles.rowCenter, {justifyContent: 'space-between'}]}>
                                <Text style={PublicStyles.title}>投诉与建议</Text>
                                <Text style={PublicStyles.title}>{tousuTel}</Text>
                            </View>
                        </Item> : null}
                </List>
            </ScrollView>

        </View>;
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
