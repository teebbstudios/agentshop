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
export default class BalanceTixianRecords extends Component {
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
                <View style={{flex: 1}}>
                    <ScrollView>
                        <Item arrow="down">
                            提现记录：
                        </Item>
                        <FlatList
                            ref={e => this.FlatList = e}
                            keyExtractor={e => String(e.id)}
                            api={UserApi.userTixianList}
                            fetchParams={{userToken, page: 1, rows: 10}}
                            renderItem={({item}) => (
                                <View key={`tixian_${item.id}`}>
                                    <View style={styles.tixianTitle}>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text>申请日期：</Text>
                                            <TimeFormat style={styles.time} value={item.createAt}/>
                                        </View>
                                        <Text style={{color: '#ff0000'}}>{item.state}</Text>
                                    </View>
                                    <View style={styles.tixianBody}>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={styles.tixianInfoLabel}>提现金额：</Text>
                                            <Text style={styles.tixianInfoText}>{item.amount}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={styles.tixianInfoLabel}>提现账户：</Text>
                                            <Text style={styles.tixianInfoText}>{item.aliPay}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={styles.tixianInfoLabel}>账户姓名：</Text>
                                            <Text style={styles.tixianInfoText}>{item.name}</Text>
                                        </View>
                                        {item.state === '审核失败' ? <View style={{flexDirection: 'row'}}>
                                            <Text style={styles.tixianInfoLabel}>失败原因：</Text>
                                            <Text style={styles.tixianInfoText}>{item.reason}</Text>
                                        </View> : null}

                                    </View>
                                </View>
                            )}
                        />
                    </ScrollView>

                </View>
            </View>
        );
    }

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
