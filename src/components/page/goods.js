import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { windowWidth, ThemeStyle } from '../../utils/style';
import { NetworkImage } from "../theme"

export default class PageGoods extends Component {
    render() {
        const { data, options } = this.props.data
        const { layout_style } = options
        // 展示形式：小图 1、大图 2、一大两小 3、列表 4
        return <View style={styles.goodsListWarp}>
            {
                data.map((item, index) => {
                    const params = {
                        item,
                        index,
                    }
                    switch (layout_style) {
                        case 2: return this.big(params);
                        case 1: return this.small(params);
                        case 3: return this.oneBigTwoSmall(params);
                        case 4: return this.list(params);
                        default: return <Text>NULL</Text>
                    }
                })
            }
        </View>
    }
    big({ item, index }) {
        return (
            <TouchableOpacity
                key={index}
                style={styles.bigWarp}
                onPress={() => this.goDetail(item.id)}
            >
                <NetworkImage style={styles.bigImg} source={{ uri: item.img }} />
                <View style={styles.bigBot}>
                    <Text style={styles.bigTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.bigPriceText}>{item.price}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    small({ item, index }) {
        // const { data } = this.props;
        return (
            <TouchableOpacity
                key={index}
                onPress={() => this.goDetail(item.id)}
                style={
                    index % 2 === 0 ? {
                        marginRight: 10,
                        width: (windowWidth - 10 - 30) / 2,
                        marginBottom: 10,
                    } : {
                            width: (windowWidth - 10 - 30) / 2,
                            marginBottom: 10,
                        }
                }
            >
                <NetworkImage style={styles.smallImg} source={{ uri: item.img }} />
                <View style={styles.smallBot}>
                    <Text style={styles.smallTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.smallPriceText}>{item.price}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    oneBigTwoSmall({ item, index }) {
        const width = (index + 1) % 3 === 0 || (index + 1) % 3 === 2 ? (windowWidth - 10 - 30) / 2 : windowWidth - 30
        const height = (index + 1) % 3 === 0 || (index + 1) % 3 === 2 ? (windowWidth - 10 - 30) / 2 : (windowWidth - 30) * 0.88
        return (
            <TouchableOpacity
                key={index}
                onPress={() => this.goDetail(item.id)}
                style={{
                    width,
                    marginRight: (index + 1) % 3 === 2 ? 10 : 0,
                    marginBottom: 10
                }}
            >
                <NetworkImage style={[styles.smallImg, { width, height }]} source={{ uri: item.img }} />
                <View style={styles.smallBot}>
                    <Text style={styles.smallTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.smallPriceText}>{item.price}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    list({ item, index }) {
        return (
            <TouchableOpacity
                style={styles.listWarp}
                key={index}
                onPress={() => this.goDetail(item.id)}
            >
                <NetworkImage style={styles.listImg} source={{ uri: item.img }} />
                <View style={styles.listRight}>
                    <Text style={styles.listTitle} numberOfLines={3} >{item.title}</Text>
                    <Text style={styles.listPriceText}>{item.price}</Text>
                    <View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    goDetail(id) {
        this.props.navigation.navigate('GoodsDetail', {
            id
        })
    }
}

const styles = StyleSheet.create({
    // warp
    goodsListWarp: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
    },
    // list
    listWarp: {
        width: windowWidth - 30,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eaeaea',
    },
    listImg: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    listRight: {
        flex: 1,
        justifyContent: 'space-around',
    },
    listTitle: {
        marginBottom: 20,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
    },
    listMarketPriceText: {
        fontSize: 12,
        marginRight: 6,
        color: '#ccc',
        textDecorationLine: 'line-through',
    },
    listPriceText: {
        color: ThemeStyle.ThemeColor,
    },

    // big
    bigWarp: {
        marginBottom: 15,
    },
    bigImg: {
        width: windowWidth - 30,
        height: (windowWidth - 30) * 0.88,
    },
    bigBot: {
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    bigTitle: {
        marginVertical: 6,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
    },
    bigMarketPriceText: {
        marginRight: 6,
        color: '#ccc',
        textDecorationLine: 'line-through'
    },
    bigPriceText: {
        color: ThemeStyle.ThemeColor,
        marginBottom: 10,
    },

    // small

    smallImg: {
        width: (windowWidth - 40) / 2,
        height: (windowWidth - 40) / 2,
    },
    smallBot: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    smallTitle: {
        marginVertical: 6,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20,
        height: 40
    },
    smallMarketPriceText: {
        marginRight: 6,
        color: '#ccc',
        textDecorationLine: 'line-through'
    },
    smallPriceText: {
        color: ThemeStyle.ThemeColor,
        marginBottom: 10,
    },
});
