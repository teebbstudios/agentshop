import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import PropTypes from "prop-types";
import OrderButton from './button'
import { windowWidth } from "../../utils/style";
import { NetworkImage } from "../theme"

export default class OrderGoodsList extends Component {
    static propTypes = {
        goodsList: PropTypes.array,
    };
    static defaultProps = {
        goodsList: null,
    };

    onRefund(goodsInfo) {
        if (this.props.onRefund) {
            this.props.onRefund({ goodsInfo });
        }
    }

    onRefundDetail(goodsInfo) {
        if (this.props.onRefundDetail) {
            this.props.onRefundDetail({ goodsInfo });
        }
    }

    onGoodsDetail(goodsInfo) {
        if (this.props.onGoodsDetail) {
            this.props.onGoodsDetail({ goodsInfo });
        }
    }

    render() {
        const { goodsList } = this.props
        return <View style={styles.orderGoodsList}>
            {goodsList.length > 0 ? goodsList.map((item) => <View style={styles.item} key={item.id}>
                <TouchableOpacity style={styles.content} onPress={() => {
                    this.onGoodsDetail(item)
                }}>
                    <View style={styles.content}>
                        <NetworkImage style={styles.image} source={{ uri: item.goods_img }} resizeMode={'cover'} />
                        <View style={styles.body}>
                            <Text style={styles.bodyText}>{item.goods_title}</Text>
                        </View>
                    </View>
                    <View style={styles.end}>
                        <Text style={styles.price}>¥{item.goods_price}</Text>
                        <Text style={styles.number}>x {item.goods_num}</Text>
                    </View>
                </TouchableOpacity>
                {item.refund_state === 1 ? <View style={styles.footer}>
                    <OrderButton
                        text="申请退款"
                        size="small"
                        onClick={() => {
                            this.onRefund(item)
                        }} />
                </View> : null}
                {item.refund_state === 2 ? <View style={styles.footer}>
                    <OrderButton
                        text="退款中"
                        size="small"
                        onClick={() => {
                            this.onRefundDetail(item)
                        }} />
                </View> : null}
                {item.refund_state === 3 ? <View style={styles.footer}>
                    <OrderButton
                        text="退款完成"
                        size="small"
                        onClick={() => {
                            this.onRefundDetail(item)
                        }} />
                </View> : null}
            </View>) : null}
        </View>
    }
}
const styles = StyleSheet.create({
    orderGoodsList: {
        backgroundColor: '#FFFFFF',
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderBottomColor: "#F8F8F8",
    },
    content: {
        justifyContent: "space-between",
        flexDirection: 'row'
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10
    },
    body: {
        width: windowWidth / 2
    },
    bodyText: {
        fontSize: 12,
        color: "#333",
        lineHeight: 20,
        fontWeight: "800",
        flex: 1
    },
    end: {
        justifyContent: 'flex-end',
        marginLeft: 20
    },
    price: {
        fontSize: 14,
        fontWeight: "800",
        marginBottom: 10,
        lineHeight: 14,
        textAlign: 'right'
    },
    number: {
        fontSize: 14,
        marginBottom: 10,
        lineHeight: 14,
        textAlign: 'right'
    },
    footer: {
        justifyContent: "flex-end",
        flexDirection: 'row'
    }
})
