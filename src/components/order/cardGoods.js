import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import PropTypes from "prop-types";
import { NetworkImage } from "../theme"

export default class OrderCardGoods extends Component {
    static propTypes = {
        goodsList: PropTypes.array,
    };
    static defaultProps = {
        goodsList: [],
    };

    onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        const {
            goodsList,
        } = this.props
        return <View style={{backgroundColor: '#f3f3f3'}}>
            {goodsList.length > 1 ? <TouchableOpacity onPress={() => {
                this.onClick()
            }}>
                <ScrollView contentContainerStyle={styles.orderCardGoods}>
                        {
                            goodsList.length > 0 ? goodsList.map((item) => {
                                return <View style={styles.item} key={item.id}>
                                    <NetworkImage style={styles.image} source={{ uri: item.goods_img }} resizeMode={'cover'} />
                                </View>
                            }) : null}
                </ScrollView>
            </TouchableOpacity> : null}
            {goodsList.length === 1 ? <TouchableOpacity onPress={() => {
                this.onClick()
            }}>
                <View style={styles.orderCardGoodsOne}>
                    {goodsList.map((item) => {
                        return <View style={styles.oneItem} key={item.id}>
                            <NetworkImage style={styles.oneImage} source={{ uri: item.goods_img }} resizeMode={'cover'} />
                            <View style={styles.oneBody}>
                                <Text style={styles.oneText}>{item.goods_title}</Text>
                                <View style={styles.oneDesc}>
                                    <Text style={styles.oneDescLabel}>{item.goods_spec.map(function (spec) {
                                        return spec.value_id > 0 ? `${spec.name}:${spec.value_name}` : ''
                                    })}</Text>
                                    <Text style={styles.oneDescText}>x{item.goods_num}</Text>
                                </View>
                                <Text>¥{item.goods_price}</Text>
                            </View>
                        </View>
                    })}

                </View>
            </TouchableOpacity> : null}
        </View>
    }
}
const styles = StyleSheet.create({
    orderCardGoods: {
        flexDirection: 'row',
        backgroundColor:'#f8f8f8',
        paddingHorizontal: 15
    },
    item: {
        marginRight: 10,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderBottomColor: "#F8F8F8",
        flexDirection: 'row'
    },
    image: {
        width: 75,
        height: 75
    },
    orderCardGoodsOne: {
        marginTop: 15,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15
    },
    oneItem: {
        justifyContent: "flex-start",
        height: 75,
        flexDirection:'row'
    },
    oneImage: {
        width: 75,
        height: 75,

        marginRight: 10
    },
    oneBody: {
        flex: 1,
        color: "#333",
        position: "relative"
    },
    oneText: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 18,
    },
    oneLabel: {
        fontSize: 12,
        position: "absolute",
        bottom: "0",
        left: 0,
        color: "#666"
    },
    oneDesc: {
        fontSize: 12,
        color: "#999",
        marginBottom: 10,
        marginTop: 5,
        justifyContent: "space-between",
        flexDirection:'row'
    },
    oneDescLabel: {
        fontSize:12,
        color:'#999'
    },
    oneDescText: {
        fontSize:12,
        color:'#999'
    }
})
