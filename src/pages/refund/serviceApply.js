import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    SafeAreaView
} from 'react-native';
import fa from '../../utils/fa'
import RefundModel from '../../models/refund'
import OrderModel from '../../models/order'
import { Button } from 'antd-mobile-rn';
import { Field } from '../../components'
import { StackActions } from "react-navigation";
import { NetworkImage } from "../../components/theme"

const refundModel = new RefundModel()
const orderModel = new OrderModel()
export default class ServiceApply extends Component {
    state = {
        delta: 1,
        noMoreThan: 0,

        refundType: 1,
        reasonList: [],
        receiveStateList: [
            {
                value: '未收到货',
                label: '未收到货'
            },
            {
                value: '已收到货',
                label: '已收到货'
            }
        ],
        reason: '',
        userReceive: null,
        refundAmount: '',
        userExplain: '',

        goodsInfo: null,
        images: [],
        uploaderMaxNum: 6,
        uploaderButtonText: '上传凭证(最多6张)',
    }

    async componentWillMount() {
        const order_goods_id = this.props.navigation.getParam('order_goods_id')
        const refund_type = this.props.navigation.getParam('refund_type')
        const delta = this.props.navigation.getParam('delta', 1)

        const goodsInfoResult = await orderModel.goodsInfo({
            id: order_goods_id
        })
        const refundType = parseInt(refund_type) !== 1 ? 2 : 1
        const result = await refundModel.reasonList({
            refund_type: refundType
        })
        const reasonList = result.list.map(function (item) {
            return {
                value: item.title,
                label: item.title
            }
        })
        const noMoreThan = parseFloat(goodsInfoResult.info.goods_pay_price) + parseFloat(goodsInfoResult.info.goods_freight_fee)
        this.setState({
            refundType,
            delta: parseInt(delta),
            refundAmount: noMoreThan,
            noMoreThan,
            goodsInfo: goodsInfoResult.info,
            reasonList
        })
    }

    onRefundAmountChange({ value }) {
        this.setState({
            refundAmount: parseFloat(isNaN(value) || !value ? 0 : value).toFixed(2)
        })
    }

    onReceiveStateChange({ value }) {
        this.setState({
            userReceive: value[0]
        })
    }

    onResonChange({ value }) {
        this.setState({
            reason: value[0]
        })
    }

    onUserExplainChange({ value }) {
        this.setState({
            userExplain: value
        })
    }

    onImagesChange({ value }) {
        this.setState({
            images: value
        })
    }

    async onSubmit() {
        const { reason, refundAmount, noMoreThan, userExplain, refundType, userReceive, images, delta ,goodsInfo} = this.state
        if (!reason) {
            return fa.toast.show({ title: '请选择退款原因' })
        }
        if (!refundAmount) {
            return fa.toast.show({ title: '请输入退款金额' })
        }
        if (parseFloat(refundAmount) > noMoreThan) {
            return fa.toast.show({ title: '退款金额不得超过¥' + this.state.noMoreThan })
        }
        if (!userExplain) {
            return fa.toast.show({ title: '请填写退款说明' })
        }
        if (!refundType === 2 && typeof userReceive !== "number") {
            return fa.toast.show({ title: '请选择货物状态' })
        }
        let data = {
            refund_type: refundType,
            order_goods_id: goodsInfo.id,
            reason,
            refund_amount: refundAmount,
            user_explain: userExplain,
        }
        if (images.length > 0) {
            data['images'] = images
        }
        if (refundType === 2) {
            data['user_receive'] = userReceive + 1
        }
        console.log(data)
        const result = await refundModel.apply(data)
        if (result === false) {
            fa.toast.show({
                title: refundModel.getException().getMessage()
            })
        } else {
            this.props.navigation.dispatch(StackActions.pop({ n: delta }));
        }
    }

    render() {
        const {
            noMoreThan,
            refundType,
            reasonList,
            receiveStateList,
            reason,
            userReceive,
            refundAmount,
            userExplain,
            goodsInfo,
            uploaderMaxNum
        } = this.state
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
                                <Text style={styles.number}>数量：x {goodsInfo.goods_num}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {refundType === 2 ? <Field
                    type={'picker'}
                    title="货物状态"
                    placeholder="请选择"
                    value={userReceive}
                    data={receiveStateList}
                    onChange={(e) => {
                        this.onReceiveStateChange(e)
                    }}
                    right={true}
                >
                </Field> : null}
                <Field
                    type={'picker'}
                    title="退款原因"
                    placeholder="请选择"
                    value={reason}
                    data={reasonList}
                    onChange={(e) => {
                        this.onResonChange(e)
                    }}
                >
                </Field>
                <Field
                    type={'input'}
                    inputType="decimal-pad"
                    title="退款金额"
                    placeholder={`¥${noMoreThan}`}
                    value={refundAmount ? refundAmount : noMoreThan}
                    onChange={(e) => {
                        this.onRefundAmountChange(e)
                    }}
                    desc={`最多¥${noMoreThan}，含发货邮费¥${goodsInfo.goods_freight_fee}`}
                >
                </Field>
                <Field
                    title="退款说明"
                    placeholder="必填"
                    value={userExplain}
                    onChange={(e) => {
                        this.onUserExplainChange(e)
                    }}
                    right={true}
                >
                </Field>
                <Field
                    title={'上传图片(最多9张)'}
                    type={'uploader'}
                    value={[]}
                    uploaderMaxNum={uploaderMaxNum}
                    onChange={(e) => {
                        this.onImagesChange(e)
                    }}
                >
                </Field>
            </View>
            <SafeAreaView>
                <View style={styles.footer}>
                    <Button type={'warning'} size="large" onClick={() => {
                        this.onSubmit()
                    }}>提交</Button>
                </View>
            </SafeAreaView>
        </View> : null

    }
}
const styles = StyleSheet.create({
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
    footer: {
        padding: 15
    }
})
