import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import PropTypes from "prop-types";
import OrderButton from "../order/button";
import StaticCountdown from "../fa/staticCountdown";
import RefundGoodsCard from "./goodsCard";

export default class RefundCard extends Component {
    static propTypes = {
        refundInfo: PropTypes.object,
    };
    static defaultProps = {
        refundInfo: null,
    };

    onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        // 平台处理状态 默认0处理中(未处理) 10拒绝(驳回) 20同意 30成功(已完成) 50取消(用户主动撤销) 51取消(用户主动收货)
        // 申请类型:1为仅退款,2为退货退款,默认为1
        const { refundInfo } = this.props
        return <View style={styles.refundCard}>
            <TouchableOpacity style={styles.header} onPress={() => {
                this.onClick()
            }}>
                <RefundGoodsCard
                    goodsTitle={refundInfo.goods_title}
                    goodsImg={refundInfo.goods_img}
                    goodsSpec={refundInfo.goods_spec_string}
                    goodsNum={refundInfo.goods_num}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.body} onPress={() => {
                this.onClick()
            }}>
                <View style={styles.icon}>
                    {
                        refundInfo.handle_state === 30 || refundInfo.handle_state === 51 ?
                            <Image style={styles.iconImage} source={require('../../images/refund/refund-success.png')}
                                   resizeMode={'cover'}
                            />
                            : <Image style={styles.iconImage} source={require('../../images/refund/refund-ing.png')}
                                     resizeMode={'cover'} />
                    }
                </View>
                <Text style={styles.bodyText}>{refundInfo.refund_type === 1 ? '仅退款' : '退货退款'}</Text>
                {refundInfo.handle_state === 30 ? <Text style={styles.bodyText}>退款完成</Text> : null}
                {refundInfo.handle_state === 50 ? <Text style={styles.bodyText}>已撤销退款申请</Text> : null}
                {refundInfo.handle_state === 51 ? <Text style={styles.bodyText}>确认收货，自动关闭退款申请</Text> : null}
                {refundInfo.is_close === 1 ? <Text style={styles.bodyText}>退款关闭</Text> : null}

                {refundInfo.refund_type === 2 && refundInfo.handle_state === 20 && refundInfo.is_close === 0 && refundInfo.send_expiry_time > 0 ?
                    <View>
                        <Text>待买家发货 还剩</Text>
                        <StaticCountdown countdown={refundInfo.send_expiry_seconds} format="dd天hh时mm分" />
                    </View> : null}

                {refundInfo.is_close === 0 && refundInfo.handle_state === 0 ? <View>
                    <Text>退款待处理 还剩</Text>
                    <StaticCountdown countdown={refundInfo.handle_expiry_seconds} format="dd天hh时mm分" />
                </View> : null}
            </TouchableOpacity>
            <View style={styles.footer}>
                <OrderButton text="查看详情" onClick={() => {
                    this.onClick()
                }} />
            </View>
        </View>

    }
}
const styles = StyleSheet.create({
    refundCard: {
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderBottomColor: "#F8F8F8",
    },
    header:{},
    body: {
        padding: 15,
        fontSize: 14,
        color: "#333333",
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderBottomColor: "#F8F8F8",
        flexDirection: 'row',
        backgroundColor: '#ffffff'
    },
    icon: {
        backgroundColor: "#ff8855",
        color: "#FFFFFF",
        marginRight: 5,
        width: 14,
        height: 14,
    },
    iconImage: {
        width: 14,
        height: 14,
    },
    bodyText: {
        marginRight: 10
    },
    bodyLabel: {},
    footer: {
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: "flex-end",
        flexDirection: 'row'
    }
})
