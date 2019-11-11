import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import {windowWidth, ThemeStyle} from '../../utils/style';
import {NetworkImage} from "../theme";
import {env} from '../../config/index';

export default class PageGoodsList extends Component {
    render() {
        const {navigation} = this.props;
        const {data, options} = this.props.data;
        const {goods_display_field, layout_style} = options;
        const showTitle = goods_display_field.indexOf('title') > -1;
        const showPrice = goods_display_field.indexOf('price') > -1;
        const showMarketPrice = goods_display_field.indexOf('market_price') > -1;
        // 显示内容：商品名称title、商品销售价price、商品原价market_price
        // 展示形式：大图1、小图2、一大两小3、列表4
        return <View style={styles.goodsListWarp}>
            {
                data.map((item, index) => {
                    const params = {
                        item,
                        index,
                        showTitle,
                        showPrice,
                        showMarketPrice
                    };
                    return this.list(params);
                    switch (layout_style) {
                        case 1:
                            return this.small(params);
                        case 2:
                            return this.big(params);
                        case 3:
                            return this.oneBigTwoSmall(params);
                        case 4:
                            return this.list(params);
                        default:
                            return <Text>NULL</Text>
                    }
                })
            }
        </View>
    }

    big({item, index, showTitle, showPrice, showMarketPrice}) {
        return (
            <TouchableOpacity
                key={index}
                style={styles.bigWarp}
                onPress={() => this.goDetail(item.id)}
            >
                <NetworkImage style={styles.bigImg} source={{uri: item.img}}/>
                <View style={styles.bigBot}>
                    <Text style={styles.bigTitle} numberOfLines={2}>{showTitle ? item.title : ''}</Text>
                    <View>
                        <Text style={styles.bigMarketPriceText}>{showMarketPrice ? `￥${item.market_price}` : ''}</Text>
                        <Text style={styles.bigPriceText}>{showPrice ? `￥${item.price}` : ''}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    small({item, index, showTitle, showPrice, showMarketPrice}) {
        // const { data } = this.props;
        return (
            <TouchableOpacity
                key={index}
                onPress={() => this.goDetail(item.id)}
                style={
                    index % 2 === 0 ? {
                        marginRight: 10,
                        width: (windowWidth - 10 - (2 * 10)) / 2,
                        marginTop: 10,
                    } : {
                        width: (windowWidth - 10 - (2 * 10)) / 2,
                        marginTop: 10,
                    }
                }
            >
                <NetworkImage style={styles.smallImg} source={{uri: item.img}}/>
                <View style={styles.smallBot}>
                    <Text style={styles.smallTitle} numberOfLines={2}>{showTitle ? item.title : ''}</Text>
                    <View>
                        <Text
                            style={styles.smallMarketPriceText}>{showMarketPrice ? `￥${item.market_price}` : ''}</Text>
                        <Text style={styles.smallPriceText}>{showPrice ? `￥${item.price}` : ''}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    oneBigTwoSmall({item, index, showTitle, showPrice, showMarketPrice}) {
        const width = (index + 1) % 3 === 0 || (index + 1) % 3 === 2 ? (windowWidth - 10 - (10 * 2)) / 2 : windowWidth - (10 * 2)
        const height = (index + 1) % 3 === 0 || (index + 1) % 3 === 2 ? (windowWidth - 10 - (10 * 2)) / 2 : (windowWidth - (10 * 2)) * 0.88
        return (
            <TouchableOpacity
                key={index}
                onPress={() => this.goDetail(item.id)}
                style={{
                    width,
                    marginRight: (index + 1) % 3 === 2 ? 10 : 0,
                    marginTop: 10
                }}
            >
                <NetworkImage style={[styles.smallImg, {width, height}]} source={{uri: item.img}}/>
                <View style={styles.smallBot}>
                    <Text style={styles.smallTitle} numberOfLines={2}>{showTitle ? item.title : ''}</Text>
                    <View>
                        <Text
                            style={styles.smallMarketPriceText}>{showMarketPrice ? `￥${item.market_price}` : ''}</Text>
                        <Text style={styles.smallPriceText}>{showPrice ? `￥${item.price}` : ''}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    listOld({item, index, showTitle, showPrice, showMarketPrice}) {
        return (
            <TouchableOpacity
                key={index}
                style={styles.listWarp}
                onPress={() => this.goDetail(item.id)}
            >
                <NetworkImage style={styles.listImg} source={{uri: item.img}}/>
                <View style={styles.listRight}>
                    <Text style={styles.listTitle} numberOfLines={3}>{showTitle ? item.title : ''}</Text>
                    <View>
                        <Text style={styles.listMarketPriceText}>{showMarketPrice ? `￥${item.market_price}` : ''}</Text>
                        <Text style={styles.listPriceText}>{showPrice ? `￥${item.price}` : ''}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    list({item, index, showTitle, showPrice, showMarketPrice}) {
        return (
            <TouchableOpacity
                key={index}
                style={styles.listWarp}
                onPress={() => this.goDetail(item.id)}
            >
                <NetworkImage style={styles.indexImg} imageStyle={{borderRadius: 4}}
                              source={{uri: item.img}}/>
                <View style={styles.listRight}>
                    <Text style={styles.listTitle} numberOfLines={3}>{showTitle ? item.title : ''}</Text>
                    {/*<View>*/}
                    {/*    <Text style={styles.listMarketPriceText}>{showMarketPrice ? `￥${item.market_price}` : ''}</Text>*/}
                    {/*    <Text style={styles.listPriceText}>{showPrice ? `￥${item.price}` : ''}</Text>*/}
                    {/*</View>*/}
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
        paddingHorizontal: 10,
    },
    // list
    listWarp: {
        width: windowWidth - (10 * 2),
        flexDirection: 'column',
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
    indexImg: {
        height: 120,
        borderRadius: 4
    },
    listRight: {
        flex: 1,
        justifyContent: 'space-around',
    },
    listTitle: {
        marginBottom: 20,
        fontSize: 14,
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
        marginTop: 10,
    },
    bigImg: {
        width: windowWidth - (10 * 2),
        height: (windowWidth - (10 * 2)) * 0.88,
    },
    bigBot: {
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    bigTitle: {
        marginVertical: 6,
        fontSize: 14,
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
        width: (windowWidth - 10 - (10 * 2)) / 2,
        height: (windowWidth - 10 - (10 * 2)) / 2,
    },
    smallBot: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    smallTitle: {
        marginVertical: 6,
        fontSize: 14,
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
