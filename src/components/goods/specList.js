import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView
} from "react-native";
import {Button} from "antd-mobile-rn";
import {windowWidth, PublicStyles, ThemeStyle} from '../../utils/style';
// import SafeAreaView from "react-native-safe-area-view";
import Stepper from "./stepper";
import {NetworkImage} from "../theme";
import {add, edit, exist, info} from "../../actions/cart";
import {Toast} from "../../utils/function";

export default class GoodsSpecList extends Component {
    state = {
        spec_sign: [],
        spec_value_sign: [],
        current_sku: null,
        quantity: 1,
        theResultCanBuyNum: null,
    };

    componentDidMount() {
        const {skus, canBuyNum, canBuyMoney} = this.props;

        //获取当前选中SKU的价格
        let current_sku_price = skus[0].price;
        let this_sku_price_can_buyNum = parseInt(canBuyMoney / current_sku_price);
        this.setState({
            theResultCanBuyNum: this_sku_price_can_buyNum > canBuyNum ? canBuyNum : this_sku_price_can_buyNum
        });

        if (skus) {
            this.setState({
                spec_sign: JSON.parse(skus[0].spec_sign),
                spec_value_sign: JSON.parse(skus[0].spec_value_sign),
                current_sku: skus[0],

            })
        }
    }

    render() {
        const {spec_sign, spec_value_sign, quantity, current_sku, theResultCanBuyNum} = this.state;
        const {spec_list, skus, if_cart, title, login, navigation, buyedNum, buyedMoney, canBuy, canBuyNum, canBuyMoney, userInfo, userLevelInfo} = this.props;
        return <View style={{flex: 1}}>
            <View style={styles.popModalTitleView}>
                {
                    current_sku ? <NetworkImage
                        source={{uri: current_sku.img}}
                        style={styles.popModalTitleLeft}
                    /> : <View style={styles.popModalTitleLeft}/>
                }
                <View style={styles.popModalTitleTight}>
                    <Text style={[styles.popModalTitleTightP]}> ¥{current_sku ? current_sku.price : 0}</Text>
                    <Text style={[PublicStyles.descTwo9]}>
                        已选：
                        {
                            current_sku && current_sku.spec && current_sku.spec[0].id ? current_sku.spec.map((item) => {
                                return `${item.value_name} `;
                            }) : title
                        }
                    </Text>
                </View>
            </View>
            <ScrollView style={styles.SpecListView}>
                {
                    spec_list && spec_list.length && spec_list[0].id ? spec_list.map((spec_list_item, i) => {
                        const family_selected_data = spec_list_item.value_list.find((brotherItem) => {
                            if (spec_value_sign.indexOf(brotherItem.id) > -1) {
                                return {
                                    selected_index: spec_value_sign.indexOf(brotherItem.id),
                                }
                            }
                        });
                        return (
                            <View key={i} style={[styles.specItemView, {borderTopWidth: i === 0 ? 0 : .5}]}>
                                <View style={[PublicStyles.rowCenter, {marginBottom: 18}]}>
                                    <Text style={PublicStyles.descFour9}>
                                        {spec_list_item.name}
                                    </Text>
                                    {
                                        family_selected_data ? null :
                                            <Text style={[PublicStyles.descTwo6, {
                                                marginLeft: 10,
                                                color: ThemeStyle.ThemeColor
                                            }]}>
                                                请选择{spec_list_item.name}
                                            </Text>
                                    }
                                </View>
                                <View style={styles.itemView}>
                                    {
                                        spec_list_item.value_list.map((spec_value_list_item, j) => {
                                            const selected_index = spec_value_sign.indexOf(spec_value_list_item.id);
                                            const selected = selected_index > -1;
                                            return (
                                                <TouchableOpacity
                                                    key={j}
                                                    activeOpacity={.8}
                                                    onPress={() => {
                                                        let new_spec_value_sign = spec_value_sign.concat();
                                                        if (family_selected_data && !selected) {
                                                            const brother_selected_index = spec_value_sign.indexOf(family_selected_data.id);
                                                            new_spec_value_sign.splice(brother_selected_index, 1, spec_value_list_item.id)
                                                        } else {
                                                            if (selected) {
                                                                new_spec_value_sign.splice(selected_index, 1)
                                                            } else {
                                                                new_spec_value_sign.push(spec_value_list_item.id)
                                                            }
                                                        }
                                                        const current_skus = skus.find((item, index) => {
                                                            return item.spec_value_sign === JSON.stringify(new_spec_value_sign.sort((a, b) => {
                                                                return a - b
                                                            }))
                                                        });

                                                        //获取当前选中SKU的价格
                                                        let current_sku_price = current_skus === undefined ? skus[0].price : current_skus.price;
                                                        let this_sku_price_can_buyNum = parseInt(canBuyMoney / current_sku_price);
                                                        this.setState({
                                                            spec_value_sign: new_spec_value_sign.sort((a, b) => {
                                                                return a - b
                                                            }), // 升序
                                                            quantity: 1, // 每次选择要把数量变为1
                                                            current_sku: current_skus,
                                                            theResultCanBuyNum: this_sku_price_can_buyNum > canBuyNum ? canBuyNum : this_sku_price_can_buyNum,
                                                        })
                                                    }}
                                                    style={[
                                                        styles.sepcItemTouch,
                                                        {
                                                            backgroundColor: selected ? ThemeStyle.ThemeColor : '#f8f8f8',
                                                        }
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.sepcItemText,
                                                            {
                                                                color: selected ? '#fff' : '#333',
                                                            }
                                                        ]}
                                                    >
                                                        {
                                                            spec_value_list_item.name
                                                        }
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        )
                    }) : null
                }

                {/*<View style={[styles.titleTop, {*/}
                {/*    flexDirection: 'column',*/}
                {/*    justifyContent: 'flex-start',*/}
                {/*    alignItems: 'flex-start',*/}
                {/*    paddingBottom: 10*/}
                {/*}]}>*/}
                {/*    {userLevelInfo.map((item, index) => {*/}
                {/*        return <Text key={index} style={PublicStyles.descTwo9}>会员等级：{item.name} 立享 {item.discount}折*/}
                {/*            价格：{current_sku ? (current_sku.origin_price * item.discount / 10).toFixed(2) : (skus[0].origin_price * item.discount / 10).toFixed(2)}元</Text>*/}
                {/*    })}*/}
                {/*    <Text style={PublicStyles.descTwo9}>备注：实际价格请以选中的商品属性标价为准。</Text>*/}
                {/*</View>*/}

                <View style={[PublicStyles.rowBetweenCenter, styles.SpecListNumView]}>
                    <Text>数量</Text>
                    <Stepper
                        stock={current_sku ? current_sku.stock : 1}
                        defaultValue={quantity}
                        onChange={(e) => {
                            this.setState({
                                quantity: e
                            })
                        }}
                    />
                </View>
                {userInfo === null || userInfo.userLevel && userInfo.userLevel === '普通用户' ? null :
                    <View style={[PublicStyles.rowBetweenCenter, styles.SpecListNumView]}>
                        <Text>购买说明：您已买到此商品{buyedNum}件，共花费{buyedMoney}元。您还可购买{theResultCanBuyNum}件。</Text>
                    </View>}
            </ScrollView>
            <SafeAreaView>
                <Button
                    type='primary'
                    disabled={spec_value_sign.length !== spec_list.length || !quantity}
                    style={{
                        borderRadius: 0,
                        margin: 15
                    }}
                    onClick={() => {
                        if (!canBuy) {
                            return Toast.warn(`您已超过购买数量限制，请升级代理等级。`);
                        }
                        if (userInfo && userInfo.userLevel && userInfo.userLevel !== '普通用户' && theResultCanBuyNum > 0 && canBuy) {
                            if (quantity > theResultCanBuyNum) {
                                return Toast.warn(`您最多只能购买${theResultCanBuyNum}件。`);
                            }
                        }
                        if (login) {
                            if (if_cart) {
                                this.changeCart()
                            } else {
                                this.buyNow()
                            }
                        } else {
                            navigation.navigate('UserLogin')
                        }
                    }}
                >
                    确定
                </Button>
            </SafeAreaView>
        </View>
    }

    changeCart = async () => {
        const {current_sku, quantity} = this.state;
        const {dispatch, closeModal, userToken} = this.props;
        const e = await info({
            params: {
                goods_sku_id: current_sku.id,
                userToken
            }
        });
        const params = {
            goods_sku_id: current_sku.id,
            quantity: e ? e.info.goods_num + quantity : quantity,
            userToken,
        };
        const if_exist = await exist({
            params: {
                goods_sku_id: current_sku.id,
                userToken,
            }
        });
        if (if_exist) {
            await dispatch(edit({params}))
        } else {
            await dispatch(add({params}))
        }
        closeModal()
    };
    buyNow = async () => {
        const {current_sku, quantity} = this.state;
        const {dispatch, closeModal, navigation, userToken} = this.props;
        const params = {
            goods_sku_id: current_sku.id,
            quantity,
            userToken,
        };
        const if_exist = await exist({
            params: {
                goods_sku_id: current_sku.id,
                userToken,
            }
        });
        if (if_exist) {
            await dispatch(edit({params}))
        } else {
            await dispatch(add({params}))
        }
        const e = await info({
            params: {
                goods_sku_id: current_sku.id,
                userToken,
            }
        });
        if (e) {
            navigation.navigate("CartOrderFill", {
                way: "buy_now",
                cart_ids: [e.info.id]
            })
        }
        closeModal()
    }
}

const styles = StyleSheet.create({
    popModalTitleView: {
        height: 60,
        padding: 15,
    },
    popModalTitleLeft: {
        width: 90,
        height: 90,
        borderRadius: 3,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 15,
        shadowColor: '#000',
        shadowOffset: {width: 5, height: 0},
        shadowOpacity: 0.07,
    },
    popModalTitleTight: {
        alignItems: 'flex-start',
        marginLeft: 105,
    },
    popModalTitleTightP: {
        fontSize: 18,
        color: ThemeStyle.ThemeColor,
    },
    specItemView: {
        alignItems: 'flex-start',
        paddingTop: 18,
        flexShrink: 0,
        borderTopColor: '#eaeaea'
    },
    itemView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    sepcItemTouch: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        marginRight: 15,
        marginBottom: 15,
        borderRadius: 3
    },
    sepcItemText: {},

    SpecListView: {
        padding: 15,
        paddingBottom: 0,
    },
    SpecListBtnView: {
        flexDirection: 'row',
    },
    SpecListNumView: {
        paddingVertical: 12,
        borderTopWidth: .5,
        borderTopColor: '#eaeaea'
    },
});
