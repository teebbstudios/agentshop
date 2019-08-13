import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import fa from '../../utils/fa'
import RefundModel from '../../models/refund'
import { Modal } from 'antd-mobile-rn';
import { RefundStateCard, RefundStateReason, RefundGoodsInfo, RefundBaseInfo } from '../../components'
import { PublicStyles } from "../../utils/style";
import { StackActions } from "react-navigation";

const refundModel = new RefundModel()

export default class RefundDetail extends Component {
    state = {
        id: null,
        refundInfo: null,
    }

    componentWillMount() {
        this.setState({
            id: this.props.navigation.getParam('id')
        }, () => {
            this.props.navigation.addListener(
                'didFocus', async () => {
                    this.init()
                }
            );
        })
    }

    async init() {
        const refundInfo = await refundModel.info({ id: this.state.id })
        if (refundInfo) {
            this.setState({
                refundInfo,
            })
        }
    }

    onGoods() {
        const {goods_id} = this.state.refundInfo
        this.props.navigation.navigate('GoodsDetail', { id: goods_id })
    }

    onTrack() {
        this.props.navigation.navigate('RefundLogisticsFill', {
            id: this.state.id,
            order_goods_id: this.state.refundInfo.order_goods_id
        })

    }

    async onUndo() {
        Modal.alert('撤销申请', '您将撤销本次申请，如果问题未解决，您还可以再次发起。确定继续吗？', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'cancel' },
            {
                text: '确认', onPress: async () => {
                    const { id } = this.state
                    const result = await refundModel.revoke({ id })
                    if (result) {
                        this.init()
                    } else {
                        fa.cache.toast({
                            title: fa.code.parse(refundModel.getException().getCode())
                        })
                    }
                }
            }
        ])
    }

    updateListRow = () => {
        const { id } = this.state
        if (id > 0) {
            this.props.navigation.dispatch(StackActions.pop({ n: 1 }));
            const updateListRow = this.props.navigation.getParam('updateListRow')
            if (typeof updateListRow === 'function') {
                updateListRow(id)
            }
        }
    }

    render() {
        const { refundInfo } = this.state
        return refundInfo ? <View style={[PublicStyles.ViewMax]}>
            <View>
                <View style={{ marginBottom: 8 }}>
                    <RefundStateCard
                        refundInfo={refundInfo}
                    />
                    <RefundStateReason
                        refundInfo={refundInfo}
                        onUndo={() => {
                            this.onUndo()
                        }}
                        onTrack={() => {
                            this.onTrack()
                        }}
                    />
                </View>
                <View style={{ marginBottom: 8 }}>
                    <RefundGoodsInfo
                        refundInfo={refundInfo}
                        onGoods={() => {
                            this.onGoods()
                        }} />
                </View>
                <View>
                    <RefundBaseInfo
                        reason={refundInfo.user_reason}
                        amount={refundInfo.refund_amount}
                        num={refundInfo.goods_num}
                        createTime={refundInfo.create_time}
                        refundNumber={refundInfo.refund_sn}
                    />
                </View>
            </View>
        </View> : null
    }
}
const styles = StyleSheet.create({})
