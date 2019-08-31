import React, {Component} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    Text,
    View,
} from 'react-native';
import {PublicStyles} from '../../utils/style';
import {connect} from "react-redux";
import {modifyUserCustomDiscount, modifyUserInfo, updateUserInfo, userTixianShenqing} from "../../actions/user";
import {List} from "antd-mobile-rn";
import {Button} from "../../components/theme";
import {Toast} from "../../utils/function";
import FlatList from "../../components/flatList";
import {UserApi} from "../../config/api/user";
import TimeFormat from "../../components/fa/timeFormat";

const Item = List.Item;

@connect(({
              app: {
                  user: {
                      userInfo,
                      userToken,
                  }
              }
          }) => ({
    userInfo,
    userToken,
}))
export default class BalanceTixian extends Component {
    state: {
        balance: null,
        aliPay: null,
        name: null,
    };

    componentDidMount(): void {
        const {userInfo} = this.props;
        this.setState({
            balance: userInfo.balance === null ? '0' : `${userInfo.balance}`,
        })
    }

    render() {
        const {userInfo, userToken} = this.props;

        return (
            <View style={PublicStyles.ViewMax}>
                <View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
                    <ScrollView>
                        <Item
                            arrow="horizontal"
                            extra={<TextInput
                                placeholder="请输入提现金额"
                                defaultValue={userInfo.balance === null ? '0' : `${userInfo.balance}`}
                                underlineColorAndroid={'transparent'}
                                placeholderTextColor={'#CCCCCC'}
                                onChangeText={(e) => {
                                    this.setState({
                                        balance: e
                                    })
                                }}
                                style={{fontSize: 17, color: '#888', textAlign: 'right'}}
                            />}
                        >
                            账户余额
                        </Item>
                        <Item
                            arrow="horizontal"
                            extra={<TextInput
                                placeholder="请输入支付宝账号"
                                underlineColorAndroid={'transparent'}
                                placeholderTextColor={'#CCCCCC'}
                                onChangeText={(e) => {
                                    this.setState({
                                        aliPay: e
                                    })
                                }}
                                style={{fontSize: 17, color: '#888', textAlign: 'right',}}
                            />}
                        >
                            支付宝账号
                        </Item>
                        <Item
                            arrow="horizontal"
                            extra={<TextInput
                                placeholder="请输入姓名，用于核验"
                                underlineColorAndroid={'transparent'}
                                placeholderTextColor={'#CCCCCC'}
                                onChangeText={(e) => {
                                    this.setState({
                                        name: e
                                    })
                                }}
                                style={{fontSize: 17, color: '#888', textAlign: 'right',}}
                            />}
                        >
                            姓名
                        </Item>
                    </ScrollView>
                </View>
                <SafeAreaView>
                    <Button
                        type='primary'
                        style={{margin: 15}}
                        onClick={this.submit}
                    >
                        提 交
                    </Button>
                </SafeAreaView>
            </View>
        );
    }

    submit = () => {
        const {balance, aliPay, name} = this.state;
        const {dispatch, userInfo, userToken} = this.props;
        if (balance > userInfo.balance) {
            Toast.warn('提现金额不得大于账户余额');
            return;
        }
        if (aliPay === undefined || name === undefined) {
            Toast.warn('支付宝账户和姓名不能为空');
            return;
        }

        dispatch(userTixianShenqing({
            params: {
                balance,
                aliPay,
                name,
                userToken,
            }
        }))
    };

}
const styles = StyleSheet.create({
    tixianTitle: {
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#F8F8F8",
        flexDirection: 'row'
    },
    tixianBody: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#F8F8F8",
    },
    time: {
        fontSize: 14,
        lineHeight: 14,
        color: "#666"
    },
    tixianInfoLabel: {
        flex: 1,
        fontSize: 16,
        lineHeight: 24,
        color: "#333"
    },
    tixianInfoText: {
        flex: 3,
        fontSize: 16,
        lineHeight: 24,
        color: "#666"
    }
});
