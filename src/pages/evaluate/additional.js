import fa from '../../utils/fa'
import GoodsEvaluateModel from '../../models/goodsEvaluate'
import OrderModel from '../../models/order'
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import { Button } from 'antd-mobile-rn';
import { Rater, Field } from '../../components'
import { StackActions } from "react-navigation";
import { NetworkImage } from "../../components/theme"

const goodsEvaluateModel = new GoodsEvaluateModel()
const orderModel = new OrderModel()

export default class EvaluateAdditional extends Component {
    state = {
        id: 0,
        delta: 1,
        orderGoodsId: 0,
        content: '',
        goodsInfo: null,
        uploaderMaxNum: 9,
        uploaderButtonText: '上传图片(最多9张)',
        images: []
    }

    async componentWillMount() {
        const order_goods_id = this.props.navigation.getParam('order_goods_id')
        const delta = this.props.navigation.getParam('delta', 1)
        const goodsInfoResult = await orderModel.goodsInfo({
            id: order_goods_id
        })

        this.setState({
            id: goodsInfoResult.info.id,
            delta: typeof delta !== 'undefined' ? delta : 1,
            goodsInfo: goodsInfoResult.info,
            orderGoodsId: order_goods_id
        })
    }

    onImagesChange({ value }) {
        this.setState({
            images: value
        })
    }

    onContentChange({ value }) {
        this.setState({
            content: value
        })
    }

    async onSubmit() {
        const { content, images, orderGoodsId, delta } = this.state

        if (!content) {
            return fa.toast.show({ title: '请输入评价内容' })
        }

        let data = {
            order_goods_id: orderGoodsId,
            additional_content: content,
        }
        if (Array.isArray(images) && images.length > 0) {
            data['additional_images'] = images
        }

        const result = await goodsEvaluateModel.append(data)
        if (result === false) {
            fa.toast.show({
                title: fa.code.parse(goodsEvaluateModel.getException().getCode())
            })
        } else {
            const updateListRow = this.props.navigation.getParam('updateListRow')
            if (updateListRow) {
                updateListRow(orderGoodsId)
            }
            this.props.navigation.dispatch(StackActions.pop({ n: delta }));
        }
    }

    updateListRow = () => {
        const { id } = this.state
        if (id > 0) {
            const pages = getCurrentPages();
            const prevPage = pages[pages.length - 2];
            prevPage.updateListRow(id);
        }
    }

    render() {
        const {
            content,
            goodsInfo,
            uploaderMaxNum,
        } = this.state
        return goodsInfo ? <View>
            <View style={{backgroundColor: '#fff'}}>
                <View style={styles.refundGoodsCard}>
                    <View style={styles.body}>
                        <View style={styles.item}>
                            <View style={styles.content}>
                                <View style={styles.image}>
                                    <NetworkImage
                                        style={{ width: 80, height: 80 }}
                                        source={{ uri: goodsInfo.goods_img }}
                                        resizeMode={'cover'}
                                    />
                                </View>
                                <View style={styles.body}>
                                    <Text style={styles.bodyText}>已评价</Text>
                                    <Rater
                                        num={5}
                                        value={goodsInfo.score}
                                        size={20}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.addTitle}>
                    <Text style={styles.addTitleText}>追加评价</Text>
                </View>
                <Field
                    type={'textarea'}
                    rows={3}
                    placeholder="对评价进行补充，更客观，更全面~"
                    value={content}
                    onChange={(e) => {
                        this.onContentChange(e)
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
            </View>
            <View style={styles.footer}>
                <Button type={'warning'} size="large" onClick={() => {
                    this.onSubmit()
                }}>提交</Button>
            </View>
        </View> : null
    }
}
const styles = StyleSheet.create({

    refundGoodsCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomColor:'#f8f8f8',
        borderBottomWidth: 8
    },

    item: {
        padding: 15,
    },
    content: {
        flexDirection: 'row'
    },
    image: {
        marginRight: 15
    },
    body: {
        flexDirection: "column",
        justifyContent: "center"
    },
    bodyText: {
        fontSize: 14,
        fontWeight: "800",
        color: "#333",
        lineHeight: 18,
        marginBottom: 10
    },
    end: {
        textAlign: "right",
        marginLeft: 20
    },
    price: {
        fontSize: 14,
        fontWeight: "800",
        marginBottom: 10,
        lineHeight: 14,
    },
    number: {
        fontSize: 14,
        marginBottom: 10,
        lineHeight: 14,
    },
    footer: {
        padding: 15
    },
    addTitle: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: '#fff'
    },
    addTitleText: {},
})
