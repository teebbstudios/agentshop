import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import {PublicStyles, windowWidth} from '../../utils/style';
import {Button, List, TextareaItem} from 'antd-mobile-rn';
import fa from "../../utils/fa";
import CartModel from "../../models/cart";
import BuyModel from "../../models/buy";
import AddressModel from "../../models/address";
import {connect} from "react-redux";
import {Toast} from '../../utils/function';
import {NetworkImage} from "../../components/theme"
import {BaseComponent} from "../../components/basecomponent"
import {getOrderStateNum} from "../../actions/user";

const cartModel = new CartModel()
const buyModel = new BuyModel()
const addressModel = new AddressModel()

const Item = List.Item;

@connect(
    ({
         app: {
             user: {
                 login,
                 userInfo,
                 userToken,
             }
         }
     }) => ({
        login,
        userInfo,
        userToken,
    }),
)
export default class CartOrderFill extends BaseComponent {
    state = {
        delta: 1,
        way: 'cart', // way	否	购买途径，cart 购物车（默认）、buy_now 立即购买
        calculate: null,
        cartList: [],
        cartIds: [],
        addressId: 0,
        address: {},
        message: null,
        payState: false,
        total: 0
    };

    componentDidMount() {
        const {navigation} = this.props;
        const {cart_ids, way} = navigation.state.params;
        let cartIds = cart_ids;
        this.setState({
            cartIds
        });
        let _way = 'cart';
        let delta = this.state.delta;
        if (typeof way !== 'undefined' && way === 'buy_now') {
            _way = 'buy_now';
            delta = 1
        } else {
            _way = 'cart';
            delta = 2
        }
        this.setState({
            cartIds,
            way: _way,
            delta
        });
        this.props.navigation.addListener(
            'didFocus',
            async () => {
                await this.onShow()
            }
        );
    }

    render() {
        const {
            delta,
            way, // way	否	购买途径，cart 购物车（默认）、buy_now 立即购买
            calculate,
            cartList,
            cartIds,
            addressId,
            address,
            message,
            payState,
            total
        } = this.state;

        return (
            <View style={PublicStyles.ViewMax}>
                <ScrollView>
                    <List style={{marginTop: 8}}>
                        {addressId > 0 ?
                            <View style={styles.address}>
                                <View style={styles.selected}>
                                    <Item arrow={'horizontal'} onClick={() => {
                                        this.goAddressList()
                                    }}>
                                        <View style={{paddingVertical: 10}}>
                                            <View style={styles.selectedNamePhone}>
                                                <Text style={styles.selectedUserName}>{address.truename}</Text>
                                                <Text style={styles.selectedUserPhone}>{address.phone}</Text>
                                            </View>
                                            <Text style={styles.address}>{address.combine_detail}</Text>
                                        </View>
                                    </Item>
                                </View>
                                <Image source={require('../../images/cart/address-footer-line.png')}
                                       style={styles.addressFooterLine}/>
                            </View> : <TouchableOpacity
                                style={styles.address}
                                activeOpacity={.8}
                                onPress={() => {
                                    this.goAddressAdd()
                                }}
                            >
                                <View style={styles.unSelect}>
                                    <Image
                                        style={styles.unSelectImage}
                                        source={require('../../images/cart/address.png')}
                                    />
                                    <Text style={styles.unSelectText}>添加地址</Text>
                                </View>
                                <Image
                                    style={styles.addressFooterLine}
                                    source={require('../../images/cart/address-footer-line.png')}
                                />
                            </TouchableOpacity>
                        }
                        <View>
                            {
                                cartList.length > 0 ? cartList.map((item, index) => (
                                    <Item
                                        key={index}
                                    >
                                        <View style={styles.oneItem}>
                                            <View>
                                                <NetworkImage style={styles.oneItemImage}
                                                              source={{uri: item.goods_sku_img}}/>
                                            </View>
                                            <View style={styles.oneItemBody}>
                                                <Text style={styles.oneItemBodyTitle}>{item.goods_title}</Text>
                                                <View style={styles.oneItemBodySpec}>
                                                    <Text
                                                        style={styles.oneItemBodySpecText}>{item.goods_pay_type === 2 ? (item.goods_weight > 0 ? '重量:' + item.goods_weight +
                                                        'kg' : '不计重量') : ''}{item.goods_spec_string ? item.goods_spec_string : ''}
                                                    </Text>
                                                    <Text style={styles.oneItemBodySpecText}>x{item.goods_num}</Text>
                                                </View>
                                                <Text style={styles.oneItemBodyPrice}>¥{item.goods_price}</Text>
                                            </View>
                                        </View>
                                    </Item>
                                )) : null
                            }
                        </View>
                    </List>
                    <View style={styles.message}>
                        <TextareaItem
                            rows={3}
                            value={message}
                            placeholder={'选填 有什么想对商家说的（45字以内）'}
                            count={255}
                            onChange={(value) => {
                                this.onMessageChange(value)
                            }}
                        />
                    </View>
                    <List>
                        <View>
                            {calculate !== null ? <Item
                                extra={
                                    <View>
                                        <Text style={styles.freightPrice}>+ ¥{calculate.pay_freight_fee}</Text>
                                    </View>
                                }
                            >
                                运费
                            </Item> : null}
                            <Item
                                extra={
                                    <View slot="footer">
                                        <Text
                                            style={styles.totalPrice}
                                        >
                                            ¥{calculate ? (calculate.goods_amount + calculate.pay_freight_fee) : total}
                                        </Text>
                                    </View>
                                }
                            >
                                小计
                            </Item>
                        </View>
                    </List>
                </ScrollView>
                <SafeAreaView style={{backgroundColor: '#fff'}}>
                    <View style={styles.footer}>
                        <View style={styles.footerLeft}>
                            <Text style={styles.footerLeftLabel}>实付：</Text>
                            <Text style={styles.footerLeftText}>¥{calculate ? calculate.pay_amount : total}</Text>
                        </View>
                        <View>
                            <Button
                                size={'large'}
                                type={'warning'}
                                onClick={() => {
                                    this.onCreateOrder()
                                }}
                                disabled={!calculate}
                                style={{borderRadius: 0}}
                            >
                                提交订单
                            </Button>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        )
    }

    goAddressAdd() {
        this.props.navigation.navigate('AddressAdd')
    }

    goAddressList() {
        this.props.navigation.navigate('AddressList', {onAddressChange: this.onAddressChange})
    }

    onAddressChange = (id) => {
        this.setState({
            addressId: id
        })
    };

    // 计算费用
    async initCalculate() {
        const cartIds = this.state.cartIds;
        const {userToken} = this.props;
        const calculate = await buyModel.calculate({
            cart_ids: cartIds,
            address_id: this.state.addressId,
            userToken
        });
        if (calculate) {
            this.setState({
                calculate: calculate
            })
        } else {
            fa.toast.show({
                title: fa.code.parse(buyModel.getException().getCode())
            })
        }
    }

    // 获得默认地址
    async initAddress() {
        let address;
        const {userToken} = this.props;
        if (this.state.addressId > 0) {
            address = await addressModel.info({
                id: this.state.addressId,
                userToken
            })
        } else {
            address = await addressModel.getDefault({
                userToken
            })
        }
        if (address) {
            this.setState({
                addressId: address.id,
                address
            });
            return address
        } else {
            return false
        }
    }

    onMessageChange(message) {
        this.setState({
            message
        })
    }

    async onShow() {
        const payState = this.state.payState;
        if (payState === false) {
            const {navigation} = this.props;
            const {address_checked_id} = navigation.state.params;
            const addressId = address_checked_id;
            if (addressId > 0) {
                this.setState({addressId})
            }
            const cartListState = await this.initCartList();
            if (cartListState === true) {
                const address = await this.initAddress();
                if (address.id > 0) {
                    await this.initCalculate()
                }
            } else {
                fa.toast.show({
                    title: '支付商品状态已变，请重新选择'
                })
                // setTimeout(function () {
                //     wx.navigateBack({ delta: this.state.delta })
                // }, 1500)
            }
        }

    }

    async initCartList() {
        const {userToken} = this.props
        const cartIds = this.state.cartIds;
        let checkedGoodsSkuInfoIds = [];
        let checkedCartIds = [];
        let total = 0;
        const result = await cartModel.list({
            ids: cartIds,
            userToken
        });
        if (result.list.length > 0) {
            const cartList = result.list
            for (let i = 0; i < cartList.length; i++) {
                total += parseFloat(cartList[i].goods_price).toFixed(2) * cartList[i].goods_num
                cartList[i]['goods_spec_string'] = cartList[i].goods_spec.map(function (item) {
                    return item.id > 0 ? `${item.name}:${item.value_name}` : ''
                }).join(',')
            }
            this.setState({
                checkedCartIds,
                checkedGoodsSkuInfoIds,
                cartList,
                total
            });
            return true
        } else {
            return false
        }
    }

    async onCreateOrder() {
        const {calculate, total} = this.state;
        const {dispatch, navigation, userToken} = this.props;
        if (!this.state.addressId) {
            return Toast.info("请选择收货地址");
        }
        const orderInfo = await buyModel.create({
            'way': this.state.way,
            'address_id': this.state.addressId,
            'cart_ids': this.state.cartIds,
            'message': this.state.message,
            userToken
        });
        if (orderInfo) {
            await dispatch(getOrderStateNum(userToken));
            navigation.replace('Pay', {
                orderInfo,
                pay_amount: calculate ? parseFloat(calculate.goods_amount + calculate.pay_freight_fee) : parseFloat(total)
            })
        }
    }

}

const styles = StyleSheet.create({
    address: {
        backgroundColor: '#ffffff'
    },
    unSelect: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: 15,
    },
    unSelectImage: {
        width: 32,
        height: 32,
        marginBottom: 10,
    },
    unSelectText: {
        fontSize: 14,
        lineHeight: 14,
        color: '#ff4400',
        marginBottom: 15,
    },
    selected: {},
    selectedNamePhone: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    selectedUserName: {
        fontSize: 16,
        fontWeight: '800',
        marginRight: 10,
        lineHeight: 16,
    },

    selectedUserPhone: {
        fontSize: 14,
        fontWeight: '800',
        marginRight: 15,
        lineHeight: 14,
    },
    addressBottomDecoration: {
        width: windowWidth,
        height: 5,

    },
    goodsList: {
        justifyContent: 'flex-start',
    },
    goodsListImage: {
        marginRight: 5,
        width: 48,
        height: 48,
    },
    message: {
        backgroundColor: '#ffffff',
        marginBottom: 8,
        marginTop: 8
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#FFFFFF'

    },
    footerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerLeftLabel: {
        fontSize: 16,
        lineHeight: 16,
        color: '#999999'
    },
    footerLeftText: {
        fontSize: 18,
        lineHeight: 18,
        fontWeight: '800',
        color: '#FF635C',
        marginRight: 15,
    },
    freightPrice: {
        color: '#FF635C',
        fontSize: 12,
        lineHeight: 12,

    },
    freightDesc: {
        color: '#CCCCCC',
        fontSize: 12,
        lineHeight: 12,

        marginTop: 10,
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: '800',
        color: '#FF635C'
    },
    oneItem: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    oneItemImage: {
        width: 75,
        height: 75,
        marginRight: 10,
    },

    oneItemBody: {
        flex: 1
    },
    oneItemBodyTitle: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
        fontWeight: '800',
        marginBottom: 10,
    },
    oneItemBodyPrice: {
        fontSize: 12,
        color: '#333',
        lineHeight: 12,
        fontWeight: '800',
    },
    oneItemBodySpec: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        flex: 1
    },
    oneItemBodySpecText: {
        fontSize: 12,
        color: '#999',
        lineHeight: 12,
    },
    addressFooterLine: {
        width: windowWidth,
        height: 3,
    },
})
