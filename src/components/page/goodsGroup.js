import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import { windowWidth, ThemeStyle, PublicStyles } from '../../utils/style';
import { NetworkImage } from "../theme"
import { Button, Carousel } from "antd-mobile-rn";

export default class PageGoodsGroup extends Component {
    render() {
        const { data, options } = this.props.data
        const { layout_style } = options
        console.log(data);
        // 展示形式：大图 1、小图 2、一大两小 3、列表 4、轮播 5
        const warpStyle = layout_style === 4 ? {
            paddingHorizontal: 0,
            paddingLeft: 15,
        } : layout_style === 5 ? {
            paddingHorizontal: 0,
        } : {}
        return <View style={[styles.goodsListWarp, warpStyle]}>
            {
                layout_style===5 ? this.carousel(data) :
                data.map((item, index) => {
                    const params = {
                        item,
                        index,
                    }
                    switch (layout_style) {
                        case 1: return this.big(params);
                        case 2: return this.small(params);
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
                <NetworkImage 
                    style={styles.bigImg} 
                    source={{ uri: item.img }} 
                />
                <View style={styles.bigBot}>
                    <Text style={styles.bigTitle} numberOfLines={2}>{item.title}</Text>
                    <View style={[PublicStyles.rowBetweenCenter,{ marginBottom: 6 }]}>
                        <View style={PublicStyles.rowCenter}>
                            <Text style={[PublicStyles.descTwo9, { color: ThemeStyle.ThemeColor }]}>{item.limit_buy_num}人团 ￥</Text>
                            <Text style={[PublicStyles.boldTitle, { color: ThemeStyle.ThemeColor }]}>{item.group_price}</Text>
                        </View>
                        <Text style={PublicStyles.descTwo9}>已拼{item.group_sale_num}件</Text>
                    </View>
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
                    <View style={{ marginBottom: 6 }}>
                        <View style={PublicStyles.rowCenter}>
                            <Text style={[PublicStyles.descTwo9, { color: ThemeStyle.ThemeColor }]}>{item.limit_buy_num}人团 ￥</Text>
                            <Text style={[PublicStyles.boldTitle, { color: ThemeStyle.ThemeColor }]}>{item.group_price}</Text>
                        </View>
                        <Text style={PublicStyles.descTwo9}>已拼{item.group_sale_num}件</Text>
                    </View>
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
                    <View style={{ marginBottom: 6 }}>
                        <View style={PublicStyles.rowCenter}>
                            <Text style={[PublicStyles.descTwo9, { color: ThemeStyle.ThemeColor }]}>{item.limit_buy_num}人团 ￥</Text>
                            <Text style={[PublicStyles.boldTitle, { color: ThemeStyle.ThemeColor }]}>{item.group_price}</Text>
                        </View>
                        <Text style={PublicStyles.descTwo9}>已拼{item.group_sale_num}件</Text>
                    </View>
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
                    <View style={PublicStyles.rowBetweenCenter}>
                        <View>
                            <Text style={PublicStyles.descTwo9}>{item.limit_buy_num}人团 已拼{item.group_sale_num}件</Text>
                            <View style={PublicStyles.rowCenter}>
                                <Text style={[PublicStyles.descTwo9, { color: ThemeStyle.ThemeColor }]}>￥</Text>
                                <Text style={[PublicStyles.boldTitle, { color: ThemeStyle.ThemeColor }]}>{item.group_price}</Text>
                                <Text style={[PublicStyles.descTwo9,{textDecorationColor: '#999', textDecorationLine: 'line-through'}]}> ￥{item.price}</Text>
                            </View>
                        </View>
                        <Button
                            type="primary"
                            size="small"
                            style={{
                                borderRadius: 3,
                                width: 66,
                                height: 30
                            }}
                        >
                            去开团
                        </Button>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    carousel(data) {
        // 三个一组
        let result = [];
        for (var i = 0, len = data.length; i < len; i += 3) {
            result.push(data.slice(i, i + 3));
        }
        return (
            <View style={PublicStyles.ViewOut}>
                <Carousel
                    autoplay={false}
                    infinite={false}
                    dotActiveStyle={{ backgroundColor: ThemeStyle.ThemeColor }}
                    dotStyle={{ marginHorizontal: 3, backgroundColor: '#D8D8D8', height: 8, width: 8 }}
                >
                    {
                        result.map((item, i) => {
                            if (i < 3) {
                                return (
                                    <View style={[PublicStyles.rowCenter, styles.carouselItem]} key={i}>
                                        {
                                            item.map((childItem, j) => {
                                                return (
                                                    <View
                                                        key={j}
                                                        style={styles.carouselChildItem}
                                                    >
                                                        <ImageBackground
                                                            source={{ uri: childItem.img }}
                                                            style={{
                                                                width: (windowWidth - 60) / 3,
                                                                height: (windowWidth - 60) / 3
                                                            }}
                                                        >
                                                            <View style={styles.carouselGroup}>
                                                                <Text style={styles.carouselGroupText}>{item.limit_buy_num}人团</Text>
                                                            </View>
                                                        </ImageBackground>
                                                        <View style={styles.carouselGroupBot}>
                                                            <Text style={[PublicStyles.descTwo9,{ color: ThemeStyle.ThemeColor, paddingVertical: 4 }]}>
                                                                ￥ <Text style={{fontSize: 16, fontWeight: '500'}}>{childItem.group_price}</Text>
                                                            </Text>
                                                            <Text  numberOfLines={1}>{childItem.title}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                )
                            }
                        })
                    }
                </Carousel>
            </View>
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
        width: windowWidth - 15,
        paddingRight: 15,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eaeaea',
    },
    listImg: {
        width: 75,
        height: 75,
        marginRight: 10,
    },
    listRight: {
        flex: 1,
        justifyContent: 'space-between',
    },
    listTitle: {
        fontSize: 14,
        fontWeight: '500',
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
        marginVertical: 10,
        fontSize: 16,
        fontWeight: '500',
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
        fontSize: 14,
        fontWeight: '400',
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

    // carousel
    carouselItem: {
        paddingVertical: 15,
        paddingHorizontal: 7.5
    },
    carouselChildItem: {
        width: (windowWidth - 15) / 3,
        paddingHorizontal: 7.5,
        paddingBottom: 20
    },
    carouselGroup: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,.4)',
    },
    carouselGroupText: {
        color: '#fff',
        fontSize: 12,
        paddingVertical: 3,
        textAlign: 'center'
    },
    carouselGroupBot: {
        alignItems: 'center'
    }
});
