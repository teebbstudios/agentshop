import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import PropTypes from "prop-types";
import TimeFormat from "../fa/timeFormat";
import StaticCountdown from "../fa/staticCountdown";

export default class RefundStateCard extends Component {
    static propTypes = {
        refundInfo: PropTypes.object,
    };
    static defaultProps = {
        refundInfo: null,
    };

    render() {
        const {
            refundInfo,
        } = this.props
        // <!--平台处理状态 默认0处理中(未处理) 10拒绝(驳回) 20同意 30成功(已完成) 50取消(用户主动撤销) 51取消(用户主动收货)-->
        return <View>
            {refundInfo.is_close === 0 && refundInfo.handle_state === 0 ? <View style={styles.orderStateCard}>
                <View style={styles.left}>
                    <Text style={styles.leftText}>请等待商家处理</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.rightText}>还剩</Text>
                    <StaticCountdown countdown={refundInfo.handle_expiry_seconds} format="dd天hh时mm分" />
                </View>
            </View> : null}
            {refundInfo.refund_type === 2 && refundInfo.handle_state === 20 && refundInfo.is_close === 0 && refundInfo.send_expiry_time > 0 ?
                <View>
                    {!refundInfo.tracking_time ? <View style={styles.orderStateCard}>
                        <View style={styles.left}>
                            <Text style={styles.leftText}>请退货并填写物流信息</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.rightText}>还剩</Text>
                            <StaticCountdown countdown={refundInfo.send_expiry_seconds} format="dd天hh时mm分" />
                        </View>
                    </View> : null}
                    {refundInfo.tracking_time > 0 ? <View>
                        <View style={styles.left}>
                            <Text style={styles.leftText}>等待商家确认收货中</Text>
                        </View>
                        <View style={styles.right}>
                        </View>
                    </View> : null}
                </View> : null}

            {refundInfo.handle_state === 30 ? <View style={styles.orderStateCard}>
                <View style={styles.left}>
                    <Text style={styles.leftText}>退款成功</Text>
                </View>
                <View style={styles.right}>
                    <TimeFormat style={styles.rightText} value={refundInfo.handle_time} />
                </View>
            </View> : null}
            {refundInfo.is_close === 1 ? <View style={styles.orderStateCard}>
                <View style={styles.left}>
                    <Text style={styles.leftText}>退款关闭</Text>
                </View>
                <View style={styles.right}>
                    <TimeFormat style={styles.rightText} value={refundInfo.handle_time} />
                </View>
            </View> : null}
        </View>
    }
}
const styles = StyleSheet.create({
    orderStateCard: {
        paddingHorizontal: 15,
        paddingVertical: 30,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FF635C",
        color: "#FFFFFF",
        flexDirection: 'row'
    },
    left: {
        justifyContent: "flex-start",
        alignItems: "center"
    },
    leftImage: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    leftText: {
        fontSize: 18,
        fontWeight: "800",
        color: "#FFFFFF"
    },
    right: {
        textAlign: "right",
        flexDirection: "column"
    },
    rightText: {
        color: "#FFFFFF",
        fontSize: 14,
        lineHeight: 14,
        marginBottom: 8,
        textAlign: 'right'
    },
    rightLabel: {
        color: "#FFFFFF",
        fontSize: 12,
        lineHeight: 12,
        marginTop: 6
    },
    noticebar: {
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#FFFFCC",
        padding: 10
    },
    noticebarImage: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    noticebarText: {
        fontSize: 12,
        lineHeight: 16,
        color: "#F07B3F"
    }
})
