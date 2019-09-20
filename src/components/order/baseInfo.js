import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Clipboard
} from 'react-native';
import PropTypes from "prop-types";
import TimeFormat from '../fa/timeFormat'
import OrderButton from './button'
import fa from "../../utils/fa";

export default class OrderBaseInfo extends Component {
    static propTypes = {
        orderNumber: PropTypes.string,
        createTime: PropTypes.number,
        payTime: PropTypes.number,
        payment: PropTypes.string,
        message: PropTypes.string,
    };
    static defaultProps = {
        orderNumber: null,
        createTime: null,
        payTime: null,
        payment: null,
        message: null,
    };

    setClipboardData() {
        const {orderNumber} = this.props;
        Clipboard.setString(`${orderNumber}`);
        fa.toast.show({title: '已复制', type: 'info'})
    }

    render() {
        const {orderNumber, createTime, payTime, payment, message} = this.props;
        return <View style={styles.orderBaseInfo}>
            <View style={styles.item}>
                <View style={styles.row}>
                    <Text style={styles.label}>订单编号：</Text>
                    <Text style={styles.text}>{orderNumber}</Text>
                    <OrderButton text="复制" size="small" onClick={() => {
                        this.setClipboardData()
                    }}/>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>下单时间：</Text>
                    <TimeFormat style={styles.time} value={createTime}/>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>用户留言：</Text>
                    <Text style={styles.text}>{message}</Text>
                </View>
            </View>
            {payTime > 0 ? <View style={styles.item}>
                <View style={styles.row}>
                    <Text style={styles.label}>支付方式：</Text>
                    <Text style={styles.text}>{payment}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>支付时间：</Text>
                    <TimeFormat style={styles.time} value={payTime}/>
                </View>
            </View> : null}
        </View>
    }
}
const styles = StyleSheet.create({
    orderBaseInfo: {
        backgroundColor: '#FFFFFF'
    },
    item: {
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: '#F8F8F8',
        paddingVertical: 10,
    },
    row: {
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 7.5,
        paddingHorizontal: 15,
        flexDirection: 'row'
    },
    label: {
        fontSize: 14,
        fontWeight: "800",
        lineHeight: 14,
        color: "#333"
    },
    text: {
        fontSize: 14,
        lineHeight: 14,
        color: "#666"
    },
    time: {
        fontSize: 14,
        lineHeight: 14,
        color: "#666"
    }
})
