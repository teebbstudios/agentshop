import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {
    PublicStyles,
    ThemeStyle
} from '../../utils/style'
import {
    Button
} from 'antd-mobile-rn'
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { NavigationActions } from "react-navigation";

export default class PaySuccess extends Component {
    render() {
        const { navigation } = this.props;
        const { pay_amount, pay_type, id, userToken } = navigation.state.params;
        return (
            <View style={PublicStyles.ViewOut}>
                <View style={styles.top}>
                    <AntDesignIcon
                        color="#27BB30"
                        size={60}
                        name="checkcircle"
                    />
                    <Text style={PublicStyles.boldTitle}>支付成功</Text>
                    <Text style={[PublicStyles.boldTitle, { color: ThemeStyle.ThemeColor }]}>
                        ￥
                        <Text style={{ fontSize: 25 }}>{pay_amount}</Text>
                    </Text>
                    <Text style={PublicStyles.descFour9}>{pay_type}</Text>
                </View>
                <View style={styles.bot}>
                    <Button 
                        type="primary"
                        onClick={()=>{
                            navigation.reset([NavigationActions.navigate({ routeName: 'Index' })], 0)
                        }}
                        style={{ marginBottom: 15 }}
                    >
                        返回首页
                    </Button>
                    {/*<Button*/}
                    {/*    onClick={()=>{*/}
                    {/*        navigation.navigate('OrderDetail', {id})*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    查看订单*/}
                    {/*</Button>*/}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    top: {
        alignItems: 'center',
        paddingVertical: 46,
    },
    bot: {
        paddingHorizontal: 48
    }
})
