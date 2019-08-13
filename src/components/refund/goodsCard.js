import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";
import { NetworkImage } from "../theme"

export default class RefundGoodsCard extends Component {
    static propTypes = {
        goodsTitle: PropTypes.string,
        goodsImg: PropTypes.string,
        goodsNum: PropTypes.any,
        goodsSpec: PropTypes.string,
    };
    static defaultProps = {
        goodsTitle: null,
        goodsImg: null,
        goodsNum: null,
        goodsSpec: null,
    };

    onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        const {
            goodsTitle,
            goodsImg,
            goodsNum,
            goodsSpec,
        } = this.props
        return <View style={styles.refundGoodsCard}>
            <View style={styles.body}>
                <View style={styles.item}>
                    <View style={styles.content}>
                        <View style={styles.image}>
                            <NetworkImage source={{ uri: goodsImg }} resizeMode={'cover'} style={
                                {
                                    width: 60,
                                    height: 60,
                                }
                            } />
                        </View>
                        <View style={styles.body}>
                            <Text style={styles.bodyText}>{goodsTitle}</Text>
                            <View style={styles.end}>
                                <Text style={styles.spec}>{goodsSpec}</Text>
                                <Text style={styles.number}>x {goodsNum}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>

    }
}
const styles = StyleSheet.create({
    refundGoodsCard: {
        backgroundColor:'#ffffff',
        flexDirection:'row'
    },
    item: {
        padding: 15,
        borderBottomWidth:1,
        borderStyle:"solid",
        borderBottomColor:"#F8F8F8",
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
        flex:1,
    },
    bodyText:{
        fontSize: 14,
        color: "#333",
        lineHeight: 20,
    },
    text: {
        fontSize: 14,
        color: "#333",
        lineHeight: 20,
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
        justifyContent: "flex-end"
    }
})
