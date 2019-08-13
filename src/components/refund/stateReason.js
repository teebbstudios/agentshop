import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import PropTypes from "prop-types";
import OrderButton from "../order/button";
import RefundStateSteps from "./stateSteps";

export default class RefundStateReason extends Component {
    static propTypes = {
        refundInfo: PropTypes.object,
    };
    static defaultProps = {
        refundInfo: null,
    };

    onUndo() {
        if (this.props.onUndo) {
            this.props.onUndo();
        }
    }

    onTrack() {
        if (this.props.onTrack) {
            this.props.onTrack();
        }
    }

    render() {
        const {
            refundInfo
        } = this.props
        return <View style={styles.orderStateReason}>
            {refundInfo.is_close === 0 && refundInfo.handle_state === 0 ? <View>
                <View style={styles.header}>
                    <Text style={styles.state}>您已经成功发起退款申请，请耐心等待商家处理。</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.span}>- 商家同意后，请按照给出的退货地址退货，并请记录退货运单号。</Text>
                    <Text style={styles.span}>- 如商家拒绝，您可以修改申请后再次发起，商家会重新处理。</Text>
                    <Text style={styles.span}>- 如商家超时未处理，退货申请将达成，请按系统给出的退货地址退货</Text>
                </View>
                <View style={styles.footer}>
                    <OrderButton text="撤销申请" onClick={() => {
                        this.onUndo()
                    }} />
                </View>
            </View> : null}
            {refundInfo.refund_type === 2 && refundInfo.handle_state === 20 && refundInfo.is_close === 0 && refundInfo.send_expiry_time > 0 ?
                <View>
                    {refundInfo.tracking_time > 0 ? <View style={styles.body}>
                        <View style={styles.address}>
                            <View style={styles.info}>
                                <View style={styles.user}>
                                    <Text style={styles.name}>物流公司：{refundInfo.tracking_company}</Text>
                                </View>
                                <View style={styles.address}>
                                    <Text style={styles.phone}>联系电话：{refundInfo.tracking_phone}</Text>
                                </View>
                            </View>
                        </View>
                    </View> : null}
                    {!refundInfo.tracking_time ? <View style={styles.footer}>
                        <OrderButton text="我已寄出，点击填写物流单号" onClick={() => {
                            this.onTrack()
                        }} />
                    </View> : null}
                </View> : null}
            {refundInfo.handle_state === 30 ? <View>
                <View style={styles.success}>
                    <View style={styles.info}>
                        <View style={[styles.item,{marginBottom: 10}]}>
                            <Text style={styles.label}>退款总金额</Text>
                            <Text style={styles.text}>¥{refundInfo.refund_amount}</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.label}>返回支付方</Text>
                            <Text style={styles.text}>¥{refundInfo.refund_amount}</Text>
                        </View>
                    </View>
                    <View style={styles.stateSteps}>
                        <RefundStateSteps refundInfo={refundInfo} />
                    </View>
                </View>
            </View> : null}
            {refundInfo.handle_state === 51 ? <View>
                <View style={styles.header}>
                    <Text style={styles.state}>确认收货，自动关闭退款申请</Text>
                </View>
            </View> : null}
        </View>
    }
}
const styles = StyleSheet.create({
    orderStateReason: {

    },
    header: {
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderBottomColor: "#F8F8F8",
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
    },
    state: {
        fontSize: 14,
        color: "#333333",
    },
    body: {
        fontSize: 12,
        color: "#999999",
        padding: 15,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderBottomColor: "#F8F8F8",
    },
    span: {
        fontSize:14,
        color:'#999',
        lineHeight:18,
        marginBottom: 8
    },
    footer: {
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderBottomColor: "#F8F8F8",
        padding: 15,
        justifyContent: "flex-end",
        flexDirection: 'row'
    },
    address: {
        fontSize: 14,
        color: "#333333",
        fontWeight: "800"
    },
    success: {
        padding: 15,
        backgroundColor:'#ffffff',
    },
    info: {
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderBottomColor: "#F8F8F8",
    },
    user: {},
    name: {},
    stateSteps: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 15,
    },
    item: {
        flexDirection: 'row',
    },
    label: {
        fontWeight: "800",
        marginRight: 10,
        color: "#333333",
        fontSize: 14,
    },
    text: {
        color: "#333333",
        fontSize: 14,
    }
})
