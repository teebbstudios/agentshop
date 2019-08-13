import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView
} from 'react-native';
import fa from '../../utils/fa'
import RefundModel from '../../models/refund'
import OrderModel from '../../models/order'
import { Button } from 'antd-mobile-rn';
import { RefundGoodsCard, Field } from '../../components'

const refundModel = new RefundModel()
const orderModel = new OrderModel()

/**
 * 添加退货快递单号，只有管理员审核通过(handle_state为20)的退款退货才可以填写订单号
 * @method   post
 * @param  int        id                    退款记录id
 * @param  int        tracking_no        物流单号
 * @param  string    tracking_phone        手机号
 * @param  string    tracking_explain    说明 非必须
 * @param  string    tracking_images    凭证 最多6张
 */
export default class RefundLogisticsFill extends Component {
    state = {
        id: null,
        tracking_company: '',
        tracking_no: '',
        tracking_phone: '',
        tracking_explain: '',

        goodsInfo: null,
        images: [],

        uploaderButtonText: '上传凭证(最多6张)',
        uploaderHeader: {},
        uploaderMaxNum: 9
    }

    async componentWillMount() {
        const goodsInfoResult = await orderModel.goodsInfo({
            id: this.props.navigation.getParam('order_goods_id')
        })
        this.setState({
            id: this.props.navigation.getParam('id'),
            goodsInfo: goodsInfoResult.info
        })
    }

    onTrackingCompanyChange({ value }) {
        this.setState({
            tracking_company: value
        })
    }

    onTrackingNoChange({ value }) {
        this.setState({
            tracking_no: parseInt(value)
        })
    }

    onTackingPhoneChange({ value }) {
        this.setState({
            tracking_phone: value
        })
    }

    onTrackingExplainChange({ value }) {
        this.setState({
            tracking_explain: value
        })
    }

    async onSubmit() {
        const {
            id,
            tracking_company,
            tracking_no,
            tracking_phone,
            tracking_explain,
            images
        } = this.state
        if (!tracking_company) {
            return fa.toast.show({ title: '请填写物流公司' })
        }
        if (!tracking_no) {
            return fa.toast.show({ title: '请输入物流单号' })
        }

        if (!tracking_phone) {
            return fa.toast.show({ title: '请填写手机号码' })
        }
        if (!tracking_explain) {
            return fa.toast.show({ title: '退款说明' })
        }

        let data = {
            id,
            tracking_company,
            tracking_no,
            tracking_phone,
            tracking_explain,
        }
        if (images.length > 0) {
            data['tracking_images'] = this.state.images
        }
        const result = await refundModel.setTrackingNo(data)
        if (result === false) {
            fa.toast.show({
                title: refundModel.getException().getMessage()
            })
        } else {
            this.props.navigation.goBack()
        }
    }

    onImagesChange({ value }) {
        this.setState({
            images: value
        })
    }

    render() {
        const {
            goodsInfo, tracking_company, tracking_no, tracking_phone, tracking_explain,
            uploaderMaxNum
        } = this.state
        return goodsInfo ? [<View style={{ backgroundColor: '#fff' }}>
            <RefundGoodsCard
                goodsTitle={goodsInfo.goods_title}
                goodsImg={goodsInfo.goods_img}
                goodsSpec={goodsInfo.goods_spec_string}
                goodsNum={goodsInfo.goods_num}
            />
            <Field
                title="物流公司"
                placeholder="请填写物流公司，必填"
                value={tracking_company}
                onChange={(e) => {
                    this.onTrackingCompanyChange(e)
                }}
            >
            </Field>
            <Field
                title="物流单号"
                placeholder="请输入物流单号，必填"
                value={tracking_no}
                onChange={(e) => {
                    this.onTrackingNoChange(e)
                }}
            >
            </Field>
            <Field
                title="联系电话"
                placeholder="请填写手机号码，必填"
                value={tracking_phone}
                onChange={(e) => {
                    this.onTackingPhoneChange(e)
                }}
            >
            </Field>
            <Field
                title="退款说明"
                placeholder="退款说明，必填"
                value={tracking_explain}
                onChange={(e) => {
                    this.onTrackingExplainChange(e)
                }}
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

        </View>, <SafeAreaView>
            <View style={styles.footer}>
                <Button
                    style={{ flex: 1 }}
                    type={'warning'} size="large" onClick={() => {
                    this.onSubmit()
                }}>提交</Button>
            </View>
        </SafeAreaView>] : null
    }
}
const styles = StyleSheet.create({
    footer: {
        padding: 15,
        flexDirection: 'row',
    }
})
