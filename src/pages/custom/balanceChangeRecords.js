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
export default class BalanceChangeRecords extends Component {
    render() {
        const {userToken} = this.props;
        return (
            <View style={PublicStyles.ViewMax}>
                <ScrollView>
                    <Item arrow="down">
                        资金记录：
                    </Item>
                    <FlatList
                        ref={e => this.FlatList = e}
                        keyExtractor={e => String(e.id)}
                        api={UserApi.balanceChangeRecords}
                        fetchParams={{userToken, page: 1, rows: 10}}
                        renderItem={({item}) => (
                            <View key={`balance_change_${item.id}`} style={{backgroundColor: '#ffffff',}}>
                                <View style={styles.tixianTitle}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text>变动日期：</Text>
                                        <TimeFormat style={styles.time} value={item.createAt}/>
                                    </View>
                                </View>
                                <View style={styles.tixianBody}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.tixianInfoLabel}>原始金额：</Text>
                                        <Text style={styles.tixianInfoText}>{item.originAccount}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.tixianInfoLabel}>变动金额：</Text>
                                        {
                                            item.change >= 0 ? <Text style={styles.tixianAddText}>+{item.change}</Text> :
                                            <Text style={styles.tixianMinusText}>{item.change}</Text>
                                        }

                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.tixianInfoLabel}>账户余额：</Text>
                                        <Text style={styles.tixianInfoText}>{item.balance}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.tixianInfoLabel}>变动描述：</Text>
                                        <Text style={styles.tixianInfoText}>{item.description}</Text>
                                    </View>

                                </View>
                            </View>
                        )}
                    />
                </ScrollView>

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
        flexDirection: 'row',
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
    },
    tixianAddText: {
        flex: 3,
        fontSize: 16,
        lineHeight: 24,
        color: "#e7453c"
    },
    tixianMinusText: {
        flex: 3,
        fontSize: 16,
        lineHeight: 24,
        color: "#3aa757"
    }
});
