import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import PropTypes from "prop-types";
import { NetworkImage } from "../theme"

export default class RefundGoodsInfo extends Component {
    static propTypes = {
        refundInfo: PropTypes.object,
    };
    static defaultProps = {
        refundInfo: null,
    };

    onGoods() {
        if (this.props.onGoods) {
            this.props.onGoods();
        }
    }

    render() {
        const {
            refundInfo,
        } = this.props
        return <View style={styles.refundGoodsInfo}>
            <View style={styles.header}><Text>退款信息</Text></View>
            <View style={styles.body}>
                <TouchableOpacity style={styles.item} onPress={()=>{
                    this.onGoods()
                }}>
                    <View style={styles.content}>
                        <View style={styles.image}>
                            <NetworkImage source={{ uri: refundInfo.goods_img }} resizeMode={'cover'} style={{
                                width: 60,
                                height: 60
                            }} />
                        </View>
                        <View style={styles.bbody}>
                            <Text style={styles.bbodyText}>{refundInfo.goods_title}</Text>
                            <View style={styles.end}>
                                <Text style={styles.spec}>{refundInfo.goods_spec_string}</Text>
                                <Text style={styles.number}>x {refundInfo.goods_num}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    refundGoodsInfo: {
        backgroundColor:'#ffffff'
    },
    header: {
        fontSize: 14,
        fontWeight: "800",
        paddingTop: 15,
        paddingLeft:15,
        paddingRight:15
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderBottomColor: "#F8F8F8",
    },
    content: {
        justifyContent: "flex-start",
        flexDirection: 'row'
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10
    },
    body:{

    },
    bbody: {
        flex:1
    },
    bbodyText:{
        fontSize:12,
        color: "#333",
    },
    end: {
        justifyContent: "space-between",
        marginTop: 5,
        fontSize: 12,
        color: "#999999",
        alignItems: "center",
        flexDirection: 'row'
    },
    spec: {
        color: "#999999",
        fontSize:12,
    },
    number: {
        fontSize:12,
    },
    footer: {
        justifyContent: "flex-end"
    }
})
