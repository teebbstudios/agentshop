import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView
} from "react-native";
import {Button, TextareaItem} from "antd-mobile-rn";
import {windowWidth, PublicStyles, ThemeStyle} from '../../utils/style';
import Stepper from "./stepper";
import {NetworkImage} from "../theme";
import {Toast} from "../../utils/function";
import {chargeOrderCreate} from "../../actions/charge";
import {getCartTotalNum, getOrderStateNum} from "../../actions/user";

export default class ChargeSpecList extends Component {
    state = {
        spec_sign: [],
        spec_value_sign: [],
        current_sku: null,
        current_userLevel_origin_price: null,
        quantity: 1,
        message: null,
        theResultCanBuyNum: null,
        oilName: null,
        oilAddress: null,
        oilPhone: null,
        gameAccount: null,
        gameServer: null,
        gameRole: null,
    };

    componentDidMount() {
        const {skus, canBuyNum, canBuyMoney, cateType, userInfo} = this.props;
        //获取当前选中SKU的价格
        let current_sku_price = skus[0].price;
        let this_sku_price_can_buyNum = parseInt(canBuyMoney / current_sku_price);
        this.setState({
            theResultCanBuyNum: this_sku_price_can_buyNum > canBuyNum ? canBuyNum : this_sku_price_can_buyNum
        });
        //获取当前用户会员等级的价格
        if (userInfo && cateType === 'member') {
            skus && skus.map((item) => {
                if (item.spec_value_name === userInfo.userLevel) {
                    this.setState({
                        current_userLevel_origin_price: item.origin_price,
                    });
                }
            });
        }

        if (skus) {
            this.setState({
                spec_sign: JSON.parse(skus[0].spec_sign),
                spec_value_sign: JSON.parse(skus[0].spec_value_sign),
                current_sku: skus[0],
            })
        }
    }

    render() {
        const {spec_sign, spec_value_sign, quantity, current_sku, current_userLevel_origin_price, message, theResultCanBuyNum} = this.state;
        const {spec_list, skus, if_cart, title, login, navigation, cateType, buyedNum, buyedMoney, canBuy, canBuyNum, canBuyMoney, userInfo, userLevelInfo} = this.props;
        return <View style={{flex: 1}}>
            <View style={styles.popModalTitleView}>
                {
                    current_sku ? <NetworkImage
                        source={{uri: current_sku.img}}
                        style={styles.popModalTitleLeft}
                    /> : <View style={styles.popModalTitleLeft}/>
                }
                <View style={styles.popModalTitleTight}>
                    <Text style={{fontSize: 16, color: '#666666'}}>
                        {cateType === 'tencent' ? 'QQ充值列表' :
                            cateType === 'online-game' ? '游戏充值列表' :
                                cateType === 'oil' ? '加油卡' :
                                    cateType === 'video' ? '视频会员' :
                                        cateType === 'live' ? '直播平台' :
                                            cateType === 'gift-card' ? '礼品卡' :
                                                null}
                        {title}
                    </Text>
                    {cateType === 'member' ?
                        <Text
                            style={[styles.popModalTitleTightP]}> ¥{current_sku ? current_sku.origin_price : 0} </Text> :
                        <Text style={[styles.popModalTitleTightP]}> ¥{current_sku ? current_sku.price : 0}</Text>}
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
                                            const selected_index = spec_value_sign.indexOf(spec_value_list_item.id)
                                            const selected = selected_index > -1
                                            return (
                                                <TouchableOpacity
                                                    key={j}
                                                    activeOpacity={.8}
                                                    onPress={() => {
                                                        let new_spec_value_sign = spec_value_sign.concat()
                                                        if (family_selected_data && !selected) {
                                                            const brother_selected_index = spec_value_sign.indexOf(family_selected_data.id)
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
                {/*如果当前为用户充值页面，不显示数量*/}
                {userInfo && cateType !== 'member' ?
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
                    </View> : null}
                {/*会员等级变更说明*/}
                {userInfo && cateType === 'member' ?
                    <View style={[styles.titleTop, {
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        paddingBottom: 10
                    }]}>
                        <Text
                            style={PublicStyles.descTwo9}>您当前的会员等级为{userInfo.userLevel},变更为{
                            current_sku && current_sku.spec && current_sku.spec[0].id ? current_sku.spec.map((item) => {
                                return `${item.value_name} `;
                            }) : title
                        },您需要额外付款{current_sku ? (parseFloat(current_sku.origin_price) - current_userLevel_origin_price).toFixed(2) : (parseFloat(skus[0].origin_price) - current_userLevel_origin_price).toFixed(2)}元。</Text>
                        <Text style={PublicStyles.descTwo9}>备注：会员等级只能升级，不能降级。</Text>
                    </View> : null
                }
                {cateType !== 'member' && cateType !== 'oil' && cateType !== 'online-game' ?
                    <View style={styles.message}>
                        <Text>充值号码/账号</Text>
                        <TextInput
                            placeholder={'必填，请输入充值号码或账号'}
                            style={{height: 40, borderColor: '#eaeaea', borderWidth: 1, marginTop: 10,}}
                            onChangeText={(message) => this.setState({message})}
                            value={this.state.message}
                        />
                    </View> : null
                }
                {cateType === 'oil' ?
                    <View style={styles.message}>
                        <Text>姓名</Text>
                        <TextInput
                            placeholder={'必填，请输入姓名'}
                            style={{height: 40, borderColor: '#eaeaea', borderWidth: 1, marginTop: 10,}}
                            onChangeText={(oilName) => this.setState({oilName})}
                            value={this.state.oilName}
                        />
                        <Text>地址</Text>
                        <TextInput
                            placeholder={'必填，请输入地址'}
                            style={{height: 40, borderColor: '#eaeaea', borderWidth: 1, marginTop: 10,}}
                            onChangeText={(oilAddress) => this.setState({oilAddress})}
                            value={this.state.oilAddress}
                        />
                        <Text>电话</Text>
                        <TextInput
                            placeholder={'必填，请输入电话'}
                            style={{height: 40, borderColor: '#eaeaea', borderWidth: 1, marginTop: 10,}}
                            onChangeText={(oilPhone) => this.setState({oilPhone})}
                            value={this.state.oilPhone}
                        />
                    </View> : null
                }
                {cateType === 'online-game' ?
                    <View style={styles.message}>
                        <Text>游戏账号</Text>
                        <TextInput
                            placeholder={'必填，请输入游戏账号'}
                            style={{height: 40, borderColor: '#eaeaea', borderWidth: 1, marginTop: 10,}}
                            onChangeText={(gameAccount) => this.setState({gameAccount})}
                            value={this.state.gameAccount}
                        />
                        <Text>游戏区服</Text>
                        <TextInput
                            placeholder={'必填，请输入游戏区服'}
                            style={{height: 40, borderColor: '#eaeaea', borderWidth: 1, marginTop: 10,}}
                            onChangeText={(gameServer) => this.setState({gameServer})}
                            value={this.state.gameServer}
                        />
                        <Text>游戏角色</Text>
                        <TextInput
                            placeholder={'必填，请输入电话'}
                            style={{height: 40, borderColor: '#eaeaea', borderWidth: 1, marginTop: 10,}}
                            onChangeText={(gameRole) => this.setState({gameRole})}
                            value={this.state.gameRole}
                        />
                    </View> : null
                }

                {/*{cateType === 'member' ? null :*/}
                {/*    <View style={[styles.titleTop, {*/}
                {/*        flexDirection: 'column',*/}
                {/*        justifyContent: 'flex-start',*/}
                {/*        alignItems: 'flex-start',*/}
                {/*        paddingBottom: 10*/}
                {/*    }]}>*/}
                {/*        {userLevelInfo.map((item, index) => {*/}
                {/*            return <Text key={index} style={PublicStyles.descTwo9}>会员等级：{item.name} 立享 {item.discount}折*/}
                {/*                价格：{current_sku ? (current_sku.origin_price * item.discount / 10).toFixed(2) : (skus[0].origin_price * item.discount / 10).toFixed(2)}元</Text>*/}
                {/*        })}*/}
                {/*        <Text style={PublicStyles.descTwo9}>备注：实际价格请以选中的商品属性标价为准。</Text>*/}
                {/*    </View>*/}
                {/*}*/}

                {userInfo === null || userInfo.userLevel && userInfo.userLevel === '普通用户' || cateType === 'member' ? null :
                    <View style={[PublicStyles.rowBetweenCenter, styles.SpecListNumView]}>
                        <Text
                            style={PublicStyles.descTwo9}>
                            购买说明：您已买到此商品{buyedNum}件，共花费{buyedMoney}元。您的可购买金额{canBuyMoney}元，还可购买{theResultCanBuyNum}件。
                        {/*   */}
                        </Text>
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
                        Toast.warn(`${quantity}`);
                        if (!canBuy) {
                            return Toast.warn(`您已超过购买数量限制，请升级代理等级。`);
                        }
                        if (userInfo && userInfo.userLevel && userInfo.userLevel !== '普通用户' && theResultCanBuyNum > 0 && canBuy) {
                            if (quantity > theResultCanBuyNum) {
                                return Toast.warn(`您最多只能购买${theResultCanBuyNum}件,如需购买更多请升级代理等级。`);
                            }
                            if (current_sku.price * quantity > canBuyMoney){
                                return Toast.warn(`您最多只能购买${canBuyMoney}元,如需购买更多请升级代理等级。`);
                            }
                        }
                        if (login) {
                            this.buyNow()
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

    buyNow = async () => {
        const {current_sku, quantity, message,theResultCanBuyNum, current_userLevel_origin_price, oilName, oilAddress, oilPhone, gameAccount, gameServer, gameRole} = this.state;
        const {skus, dispatch, navigation, userInfo, userToken, cateType, canBuyMoney} = this.props;
        let params = {
            goods_sku_id: current_sku.id,
            quantity,
            userToken,
            message,
            cateType
        };
        if (cateType === 'member' && userInfo && userInfo.userLevel) {
            let sku_object = current_sku ? current_sku : skus[0];
            //如果选中是会员等级相同或价格小于等于当前用户的会员等级 不购买。
            if (sku_object.spec_value_name === userInfo.userLevel || parseFloat(sku_object.origin_price) <= parseFloat(current_userLevel_origin_price)) {
                return Toast.warn(`您的会员等级已经是${userInfo.userLevel}了。`)
            }
        }
        // console.log(theResultCanBuyNum , current_sku.price * quantity , canBuyMoney);
        // //如果可购买数量等于0不让购买，如果购买的金额*选择的数量大于可购买金额也不让买
        // if (theResultCanBuyNum <= 0 || current_sku.price * quantity > canBuyMoney){
        //     return Toast.warn('您已超过可购买商品限制，请升级代理等级。');
        // }

        if (cateType === 'oil') {
            if (!oilName || !oilAddress || !oilPhone) {
                return Toast.warn('请输入收货信息');
            }
            Object.assign(params, {message: '收货人:' + oilName + '-' + '收货地址:' + oilAddress + '-' + '收货电话:' + oilPhone});
        }
        if (cateType === 'online-game') {
            if (!gameAccount || !gameServer || !gameRole) {
                return Toast.warn('请输入游戏账号信息');
            }
            Object.assign(params, {message: '游戏角色:' + gameAccount + '-' + '游戏区服:' + gameServer + '-' + '游戏角色:' + gameRole});
        }
        if (cateType !== 'member' && cateType !== 'oil' && cateType !== 'online-game' && !message) {
            return Toast.warn('请输入充值号码或账号');
        }
        // Todo 直接创建充值订单，充值商品不加入购物车。

        const orderInfo = await chargeOrderCreate({
            params
        });
        if (orderInfo) {
            await dispatch(getOrderStateNum(userToken));
            navigation.navigate("Pay", {
                orderInfo,
                pay_amount: orderInfo.total_amount.toFixed(2)
            })
        }
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
        top: 10,
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
        marginTop: 20,
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
    message: {
        borderTopWidth: 1,
        borderTopColor: '#eaeaea',
        borderStyle: 'solid',
        backgroundColor: '#ffffff',
        marginBottom: 8,
        marginTop: 8,
        paddingTop: 10,
    },
});
