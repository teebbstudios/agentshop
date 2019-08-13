import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import GoodsEvaluate from '../../models/goodsEvaluate'
import { TimeFormat, Rater } from '../../components'
import { NetworkImage } from "../../components/theme"

const goodsEvaluateModel = new GoodsEvaluate()
export default class EvaluateDetail extends Component {
    state = {
        order_goods_id: null,
        evaluate: null
    }

    componentWillMount() {
        this.setState({
            order_goods_id: this.props.navigation.getParam('order_goods_id')
        }, () => {
            this.props.navigation.addListener(
                'didFocus', async () => {
                    const { order_goods_id } = this.state
                    const evaluate = await goodsEvaluateModel.info({
                        order_goods_id
                    })
                    this.setState({
                        evaluate
                    })
                }
            );
        })
    }

    preViewImage({ images, index }) {
        let _images = images ? images.map(img => {
            return { source: { uri: img } }
        }) : []
        this.props.navigation.navigate('PhotoGallery', {
            images:_images,
            index
        })
    }

    render() {
        const {
            evaluate
        } = this.state
        return evaluate ? <View style={styles.evaluateDetail}>
            <View style={styles.goodsEvaluateItem}>
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <NetworkImage source={{ uri: evaluate.avatar }} resizeMode={'cover'} style={styles.avatarImage} />
                        <View style={styles.nickname}>
                            <Text style={styles.nicknameText}>{evaluate.nickname}</Text>
                            <TimeFormat value={evaluate.create_time} style={{ color: '#999' }} />
                        </View>
                    </View>
                    <View style={styles.star}>
                        <Rater size={12} num={5} value={evaluate.score} />
                    </View>
                </View>

                {evaluate.content ? <View style={styles.content}><Text
                    style={styles.contentText}>{evaluate.content}</Text></View> : null}
                {Array.isArray(evaluate.images) && evaluate.images.length > 0 ?
                    <View style={styles.photoList}>
                        {
                            evaluate.images.map((item, index) => {
                                return <TouchableOpacity
                                    key={`images_${index}`}
                                    onPress={() => {
                                        this.preViewImage({
                                            images: evaluate.images,
                                            index
                                        })
                                    }}
                                ><NetworkImage
                                    source={{ uri: item }}
                                    resizeMode={'cover'}
                                /></TouchableOpacity>
                            })
                        }
                    </View>
                    : null
                }
                {evaluate.reply_content ? <View style={styles.replyContent}>
                    <Text>客服：</Text>
                    <Text>{evaluate.reply_content}</Text>
                    <TimeFormat value={evaluate.reply_time} style={{ marginLeft: 5, color: '#999' }} />
                </View> : null}

                {evaluate.additional_content || evaluate.additional_images ? <View style={styles.content}>
                    <View style={{ borderLeftWidth: 5, borderColor: 'red', borderStyle: 'solid', paddingLeft: 10 }}>
                        <Text
                            style={{ color: '#999' }}>{evaluate.additional_interval_day === 0 ? '当天' : evaluate.additional_interval_day + '天后'}追评</Text>
                    </View>
                    {evaluate.additional_content ?
                        <Text style={{ marginTop: 15, color: '#333' }}>{evaluate.additional_content}</Text> : null}
                </View> : null}

                {Array.isArray(evaluate.additional_images) && evaluate.additional_images.length > 0 ?
                    <View style={styles.photoList}>
                        {
                            evaluate.additional_images.map((item, index) => {
                                return <TouchableOpacity
                                    key={`additional_images_${index}`}
                                    onPress={() => {
                                        this.preViewImage({
                                            images: evaluate.additional_images,
                                            index
                                        })
                                    }}
                                ><NetworkImage
                                    source={{ uri: item }}
                                    resizeMode={'cover'}
                                    style={styles.photoListImage}
                                /></TouchableOpacity>
                            })
                        }
                    </View>
                    : null}

                {evaluate.reply_content2 ? <View style={styles.replyContent}>
                    <Text>客服：</Text>
                    <Text>{evaluate.reply_content2}</Text>
                    <TimeFormat value={evaluate.reply_time2} style={{ marginLeft: 5, color: '#999' }} />
                </View> : null}

                <View style={styles.spec}>
                    <Text>{evaluate.goods_spec_string}</Text>
                </View>
                <View style={styles.goodsEvaluate}>
                    <Image source={evaluate.goods_img} resizeMode={'cover'} />
                    <Text>{evaluate.goods_title}</Text>
                </View>
            </View>
        </View> : null
    }

}
const styles = StyleSheet.create({
    evaluateDetail: {
        backgroundColor: "#f8f8f8"
    },
    goodsEvaluateItem: {
        padding: 15,
        backgroundColor: '#fff'
    },
    header: {
        marginTop: 15,
        justifyContent: "space-between",
        flexDirection: 'row',
    },
    avatar: {
        justifyContent: "flex-start",
        flexDirection: 'row'
    },
    avatarImage: {
        width: 32,
        height: 32,
        marginRight: 10
    },
    nickname: {
        flexDirection: "column"
    },
    nicknameText: {
        fontSize: 14,
        marginBottom: 6,
        fontWeight: "800",
    },

    content: {
        fontSize: 14,
        color: "#333",
        marginTop: 10,
    },
    contentText: {
        fontSize: 14,
        lineHeight: 22,
        color: "#333",
        width: "100%",
    },
    replyContent: {
        backgroundColor: "#f8f8f8",
        padding: 5,
        fontSize: 12,
        color: "#666",
        borderRadius: 3,
        alignItems: 'center',
        flexDirection: 'row'
    },
    photoList: {
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10
    },
    photoListImage: {
        width: 80,
        height: 80,
        marginBottom: 5,
        marginRight: 5
    },
    spec: {
        fontSize: 12,
        lineHeight: 12,
        color: "#999",
        marginTop: 10,
        marginBottom: 15
    },
    footer: {
        borderTopWidth: 1,
        borderStyle: "solid",
        borderTopColor: "#F8F8F8",
        textAlign: "center",
        color: "#999999",
        fontSize: 14,
        lineHeight: 14,
        padding: "15px 0"
    }
})
