import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import OrderModel from '../../models/order'
import { List } from 'antd-mobile-rn';
import { Cell } from '../../components'
import { NetworkImage } from "../../components/theme"

const orderModel = new OrderModel()

export default class ServiceType extends Component {
    state = {
        goodsInfo: null,
    }

    async componentWillMount() {
        const goodsInfoResult = await orderModel.goodsInfo({
            id: this.props.navigation.getParam('order_goods_id')
        })
        this.setState({
            goodsInfo: goodsInfoResult.info,
        })
    }

    onClick(refundType) {
        this.props.navigation.navigate('RefundServiceApply', {
            order_goods_id: this.state.goodsInfo.id,
            refund_type: refundType,
            delta: 2
        })
    }

    render() {
        const { goodsInfo } = this.state
        return goodsInfo ? <View>
                <View style={styles.refundGoodsCard}>
                    <View style={styles.item}>
                        <View style={styles.content}>
                            <View style={styles.image}>
                                <NetworkImage source={{ uri: goodsInfo.goods_img }} resizeMode={'cover'} style={{
                                    width: 60,
                                    height: 60,
                                }} />
                            </View>
                            <View style={styles.body}>
                                <Text style={styles.bodyText}>{goodsInfo.goods_title}</Text>
                                <View style={styles.end}>
                                    <Text style={styles.spec}>{goodsInfo.goods_spec_string}</Text>
                                    <Text style={styles.number}>x {goodsInfo.goods_num}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <List>
                    <Cell
                        titleStyle={{ fontSize: 14 }}
                        arrow={'horizontal'}
                        title="仅退款"
                        label="未收到货（包含未签收），或卖家协商同意前提现"
                        onClick={() => {
                            this.onClick(1)
                        }}
                        icon={<Image style={styles.icon} source={require("../../images/refund/refund-type-1.png")} />}
                    >
                    </Cell>
                    <Cell
                        titleStyle={{ fontSize: 14 }}
                        arrow={'horizontal'}
                        title="退货退款"
                        label="已收到货，需要退换已收到的货物"
                        onClick={() => {
                            this.onClick(2)
                        }}
                        icon={<Image style={styles.icon} source={require("../../images/refund/refund-type-2.png")} />}
                    >
                    </Cell>
                </List>
            </View> :
            null
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25,
        marginRight: 15
    },
    refundGoodsCard: {
        backgroundColor: '#fff',
    },
    item: {
        padding: 15,
        borderBottomWidth: 8,
        borderStyle: "solid",
        borderBottomColor: "#f8f8f8",
    },
    content: {
        flexDirection: 'row',
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10
    },
    body: {
        flex: 1
    },
    bodyText: {
        fontSize: 14,
        fontWeight: "800",
        color: "#333",
        marginBottom: 10
    },
    end: {
        flexDirection: 'column',
    },
    spec: {
        fontSize: 12,
        color: "#999999",
    },
    number: {
        marginTop: 5,
        fontSize: 12,
        color: "#999999",
    },
})
