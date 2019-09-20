import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import { PublicStyles, windowWidth, ThemeStyle, windowHeight } from "../../utils/style";
import { NetworkImage } from "../../components/theme";
import Fetch from "../../utils/fetch";
import { GoodsCategoryApi } from "../../config/api/goodsCategory";
import { ShopApi } from "../../config/api/shop";
import GoodsItem from "../../components/goods/item";
import FlatList from "../../components/flatList";
import { GoodsApi } from "../../config/api/goods";
import {connect} from "react-redux";

@connect(
    ({
         app: {
             user: {
                 userToken
             }
         }
     }) => (
        {
            userToken
        }
    ))
export default class Category extends Component {
    state = {
        current: 0,
        categoryList: [],
        goods_category_style: 1,
    };

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus', async () => {
                const shopInfo = await Fetch.fetch({
                    api: ShopApi.info,
                });
                const goodsCategory = await Fetch.fetch({
                    api: GoodsCategoryApi.list,
                });
                if (goodsCategory.code === 0 && shopInfo.code === 0) {
                    this.setState({
                        categoryList: goodsCategory.result.list,
                        // current: goodsCategory.result.list[0].id,
                        goods_category_style: shopInfo.result.info.goods_category_style+1
                    })
                }
            }
        )
    }

    render() {
        const { goods_category_style } = this.state;
        if(goods_category_style===1){
            return this.PageOne()
        } else if (goods_category_style === 2) {
            return this.PageTwo()
        } else if (goods_category_style === 3) {
            return this.PageThree()
        }
    }
    PageOne = () => {
        const { current, categoryList } = this.state;
        const currentList = categoryList.filter(item => item.id === current)
        const _child = currentList.length ? currentList[0]._child : []
        return <View style={[PublicStyles.ViewMax, { flexDirection: 'row' }]}>
            <ScrollView style={styles.left}>
                {
                    categoryList.map((item, index) => {
                        const active = item.id === current
                        return (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={.6}
                                style={[styles.leftItem, {
                                    backgroundColor: active ? '#f8f8f8' : '#ffffff'
                                }]}
                                onPress={() => {
                                    this.setState({
                                        current: item.id,
                                    })
                                }}
                            >
                                <Text
                                    style={[styles.leftName, {
                                        color: active ? ThemeStyle.ThemeColor : '#333',
                                        fontFamily: active ? 'PingFangSC-Medium' : 'PingFangSC-Regular',
                                        fontWeight: active ? '500' : '400',
                                    }]}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
            <ScrollView style={styles.right}>
                {
                    !current ? this.empty({ content: '请选择' }) :
                        current && _child.length ? this.renderRight(_child) :
                            current && !_child.length ? this.empty({ content: '当前分类为空' }) : null
                }
            </ScrollView>
        </View>;
    };

    renderRight(_child) {
        const { navigation } = this.props
        return (
            <View style={styles.rightList}>
                {
                    _child.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.rightItem}
                            onPress={() => {
                                navigation.navigate("GoodsList", {
                                    category_id: item.id,
                                })
                            }}
                        >
                            <NetworkImage style={styles.rightImg} source={{ uri: item.icon }}/>
                            <Text style={[PublicStyles.title, { fontSize: 14 }]} numberOfLines={1}>{item.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    empty({content}) {
        return (
            <View style={styles.emptyWarp}>
                <Image 
                    style={styles.emptyImg} 
                    source={require('../../images/fetchStatus/searchNullData.png')}
                />
                <Text style={PublicStyles.descFour9}>{content}</Text>
            </View>
        )
    }

    PageTwo = () => {
        const { categoryList } = this.state;
        const { navigation } = this.props
        return <View style={[PublicStyles.ViewMax, { flexDirection: 'row' }]}>
            <ScrollView>
                {
                    categoryList.map((item,i)=>(
                        <View key={i} style={styles.item}>
                            <Text style={styles.itemName}><Text style={{color: '#ccc'}}>— </Text> {item.name} <Text style={{color: '#ccc'}}>— </Text></Text>
                            <View style={styles.childView}>
                                {
                                    item._child.map((childItem,j)=>(
                                        <TouchableOpacity 
                                            key={j} 
                                            style={styles.childItem}
                                            onPress={() => {
                                                navigation.navigate("GoodsList", {
                                                    category_id: item.id,
                                                })
                                            }}
                                        >
                                            <NetworkImage style={styles.childImg} source={{ uri: childItem.icon }} />
                                            <Text style={styles.childName} numberOfLines={1}>{childItem.name}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
        </View>;
    }

    PageThree = () => {
        const { current, categoryList } = this.state;
        const { navigation, userToken } = this.props;
        let params = {
            category_ids: current ? [parseInt(current)] : null,
        };
        if (userToken){
            params = Object.assign(params, {userToken});
        }
        return <View style={PublicStyles.ViewMax}>
            <View style={styles.btnWarp}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}  // 隐藏水平指示器
                >
                    <TouchableOpacity
                        style={[styles.btnItem, !current ? styles.btnItemActive : {}]}
                        activeOpacity={.8}
                        onPress={() => {
                            this.setState({
                                current: 0
                            }, () => this.FlatList.setFetchParams({
                                category_ids: null
                            }))
                        }}
                    >
                        <Text style={[styles.btnItemText, !current ? styles.btnItemTextActive : {}]}>全部</Text>
                    </TouchableOpacity>
                    {
                        categoryList.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.btnItem, current === item.id ? styles.btnItemActive : {}]}
                                activeOpacity={.8}
                                onPress={() => {
                                    this.setState({
                                        current: item.id
                                    }, () => this.FlatList.setFetchParams({
                                        category_ids: [item.id]
                                    }))
                                }}
                            >
                                <Text style={[styles.btnItemText, current === item.id ? styles.btnItemTextActive : {}]}>{item.name}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
            <FlatList
                ref={e => this.FlatList = e}
                keyExtractor={e => String(e.id)}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <GoodsItem
                        data={item}
                        index={index}
                        onPress={() => {
                            if (item.is_charge_goods){
                                navigation.navigate('ChargeItemPage', {
                                    id: item.id,
                                    cateType: item.cateType
                                })
                            }else{
                                navigation.navigate("GoodsDetail", {
                                    id: item.id
                                });
                            }
                        }}
                    />
                )}
                api={GoodsApi.list}
                fetchParams={params}
            />
        </View>;
    }
}

const styles = StyleSheet.create({
    // pageone
    left: {
        width: windowWidth * 0.33,
        backgroundColor: '#fff',
    },
    leftItem: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftName: {
        fontSize: 16
    },
    right: {
        width: windowWidth * 0.67,
    },
    rightList: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    rightItem: {
        width: (windowWidth * 0.67) / 3.01,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    rightImg: {
        width: (windowWidth * 0.67) / 3 - 30,
        height: (windowWidth * 0.67) / 3 - 30,
        marginBottom: 10
    },
    emptyWarp: {
        height: windowHeight / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyImg: {
        marginBottom: 10
    },
    // pagetwo
    item: {
        backgroundColor: '#fff',
        marginBottom: 10
    },
    itemName: {
        fontSize: 16,
        color: '#333',
        lineHeight: 60,
        textAlign: 'center'
    },
    childView: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    childItem: {
        width: windowWidth/4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    childImg: {
        width: 52,
        height: 52
    },
    childName: {
        color: '#666',
        fontSize: 14,
        lineHeight: 14,
        marginVertical: 15,
    },
    // pagethree
    btnWarp: { 
        backgroundColor: '#fff', 
        height: 48,
        paddingHorizontal: 10,
        flexDirection: 'row',
        overflow: 'scroll',
        marginBottom: 10
    },
    btnItem: {
        alignSelf: 'center',
        justifyContent: 'center',
        height: 24,
        marginRight: 10,
        borderRadius: 12,
        overflow: 'hidden',
        paddingHorizontal: 20,
        backgroundColor: '#f8f8f8'
    },
    btnItemActive: {
        backgroundColor: '#ffffff',
        borderColor: ThemeStyle.ThemeColor,
        borderWidth: 0.5,
    },
    btnItemText: {
        fontSize: 14, 
        color: '#333333'
    },
    btnItemTextActive: {
        color: ThemeStyle.ThemeColor
    },
});
