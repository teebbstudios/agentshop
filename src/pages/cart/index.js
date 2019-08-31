import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet, View, ScrollView, RefreshControl, Text } from 'react-native';
import { windowWidth, PublicStyles, ThemeStyle } from "../../utils/style";
import fa from "../../utils/fa"
import { Button, SwipeAction } from 'antd-mobile-rn';
import CartItem from "../../components/cart/item";
import CartCheckbox from "../../components/cart/checkbox";
import CartEmpty from "../../components/cart/empty";
import CartLogin from "../../components/cart/login";
import CartModel from "../../models/cart";
import CartLogic from "../../logics/cart";
import store from "../../store";
import { getCartTotalNum } from "../../actions/user";
import {BaseComponent} from "../../components/basecomponent";

const cartModel = new CartModel()
const cartLogic = new CartLogic()

@connect((
    { 
        app: { 
            user: {
                login,
                userToken
            } 
        } 
    }
)=> ({
    login,
    userToken
}))
export default class CartIndex extends BaseComponent {
    state = {
        refreshing: true,
        cartListLoadedState: false,
        onLoaded: false,
        goodsId: null,
        specClickGoodsId: null,
        specClickGoodsSkuId: null,
        inCartNumber: 0,
        goodsInfo: null,
        goodsSkuId: null,
        removeCheckSkuIds: [],
        specIdValueIdsChecked: [],
        isSaveMode: false,
        cartSkuShow: false,
        stepper: 1,
        cartList: [],
        total: 0,
        totalNum: 0,
        checkedGoodsSkuInfoIds: [],
        checkedCartIds: [],
        allChecked: false,
        userInfo: null,
    };
    componentDidMount() {
        
        this.props.navigation.addListener(
            'didFocus',
            async () => {
                const { login, userToken } = this.props;
                if(login){
                    await this.initCartList({userToken});
                    store.dispatch(getCartTotalNum(userToken));
                }else {
                    this.setState({
                        refreshing: false
                    })
                }
            }
        );
    }

    renderInit() {
        return this.renderCartList()
    }

    renderCartList() {
        const { cartList } = this.state;
        const { login, navigation } = this.props;
        return <View style={PublicStyles.ViewMax}>
            {
                !login ? <CartLogin navigation={navigation} /> : Array.isArray(cartList) && cartList.length > 0 ? <ScrollView>
                    {
                        cartList.map((item, index) => (
                            <SwipeAction
                                key={index}
                                autoClose
                                style={{ backgroundColor: 'transparent' }}
                                right={[
                                    {
                                        text: '删除',
                                        onPress: () => this.delete(item.goods_sku_id),
                                        style: { backgroundColor: 'red', color: 'white' },
                                    },
                                ]}
                            >
                                <CartItem
                                    key={index}
                                    title={item.goods_title}
                                    price={item.goods_price}
                                    spec={item.goods_spec_string}
                                    cover={item.goods_sku_img}
                                    stock={item.spec_stock}
                                    checked={item.is_check === true}
                                    number={item.goods_num}
                                    onStepperChange={(value) => {
                                        this.onStepperChange(item, value, index)
                                    }}
                                    onCheckboxClick={(value) => {
                                        this.onChecked(item, value, index)
                                    }}
                                    onImageClick={() => {
                                        this.props.navigation.navigate('GoodsDetail', { id: item.goods_id })
                                    }}
                                    onTitleClick={() => {
                                        this.props.navigation.navigate('GoodsDetail', { id: item.goods_id })
                                    }}
                                />
                            </SwipeAction>
                        ))
                    }
                </ScrollView> : <CartEmpty />
            }
        </View>
    }

    render() {
        const { refreshing, checkedGoodsSkuInfoIds, cartList, totalNum, total } = this.state;
        const { login, userToken } = this.props;
        return <View style={PublicStyles.ViewMax}>
            <ScrollView
                contentContainerStyle={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        colors={['#fff']}
                        progressBackgroundColor={ThemeStyle.ThemeColor}
                        tintColor={ThemeStyle.ThemeColor}
                        titleColor={ThemeStyle.ThemeColor}
                        title="加载中..."
                        onRefresh={() => {
                            this.initCartList({userToken})
                        }}
                    />
                }
                scrollEventThrottle={50}
            >
                {
                    this.renderInit()
                }
            </ScrollView>
            {cartList.length > 0&&login ? <View style={styles.footer}>
                <View style={styles.footerLeft}>
                    <View style={styles.footerAllAction}>
                        <CartCheckbox
                            checked={checkedGoodsSkuInfoIds.length === cartList.length}
                            onClick={() => {
                                this.onAllChecked()
                            }}
                        />
                        <Text style={styles.footerAllActionText}>全选</Text>
                    </View>
                    <View
                        style={styles.footerTotal}>
                        <Text style={styles.footerTotalText}>合计：</Text>
                        <Text style={styles.footerTotalPrice}>¥{total}</Text>
                    </View>
                </View>
                <View style={styles.footerRight}>
                    <Button
                        style={{ borderRadius: 0 }}
                        type={'warning'}
                        size={'large'}
                        activeStyle={false}
                        onClick={() => {
                            this.goOrderFill()
                        }}><Text>去结算({totalNum}件)</Text>
                    </Button>
                </View>
            </View> : null}
        </View>
    }

    async delete(goods_sku_id) {
        const { userToken } = this.props;
        await cartModel.del({
            goods_sku_ids: [goods_sku_id],
            userToken
        });
        await this.initCartList({userToken})
    }

    async onChecked(item, value, index) {
        const { userToken } = this.props;
        const result = await cartModel.check({
            goods_sku_ids: [item.goods_sku_id],
            is_check: item.is_check === true ? 0 : 1,
        });
        if (result !== true) {
            fa.toast.show({
                title: fa.code.parse(cartModel.getException().getCode())
            })
        }

        this.initCartList({userToken})
    }

    async onStepperChange(item, number, index) {
        const { userToken } = this.props;
        const goods_sku_id = item.goods_sku_id;
        const result = await cartLogic.save(goods_sku_id, number, userToken);
        if (result !== false) {
            this.initCartList({userToken})
        } else {
            this.setState({})
            fa.toast.show({
                title: fa.code.parse(cartLogic.cartModel.getException().getCode())
            })
        }
    }

    async onAllChecked() {
        const { cartList, checkedGoodsSkuInfoIds } = this.state;
        const { userToken } = this.props;
        const cartLength = cartList.length;
        const checkedLength = checkedGoodsSkuInfoIds.length;
        const goodsSkuIds = cartList.map(function (item) {
            return item.goods_sku_id
        });

        const result = await cartModel.check({
            goods_sku_ids: goodsSkuIds,
            is_check: cartLength === checkedLength ? 0 : 1,
        });
        if (result !== true) {
            fa.toast.show({
                title: fa.code.parse(cartModel.getException().getCode())
            })
        }
        this.initCartList({userToken})
    }

    toggleGoodsSkuSelect() {
        this.setState({
            cartSkuShow: false
        })
    }

    async onCartGoodsSpecClick(e) {
        this.setState({
            specIdValueIdsChecked: e.detail.goodsSkuId !== this.state.goodsSkuId ? [] : this.state.specIdValueIdsChecked,
            goodsId: e.detail.goodsId,
            specClickGoodsId: e.detail.goodsId,
            specClickGoodsSkuId: e.detail.goodsSkuId,
            goodsSkuId: e.detail.goodsSkuId,
            cartSkuShow: true
        });
        await this.initGoodsInfo()
    }

    bindToggleSave(e) {
        const { userToken } = this.props;
        this.setState({
            removeCheckSkuIds: [],
            isSaveMode: !this.state.isSaveMode
        });
        this.initCartList({userToken})
    }

    goOrderFill() {
        const {checkedCartIds} = this.state;
        this.props.navigation.navigate('CartOrderFill', { cart_ids: checkedCartIds })
    }

    async initCartList({userToken}) {
        let total = 0;
        let totalNum = 0;
        let checkedGoodsSkuInfoIds = [];
        let checkedCartIds = [];
        const result = await cartModel.list({userToken});
        if (result === false) {
            this.setState({
                cartListLoadedState: false,
                checkedCartIds: [],
                checkedGoodsSkuInfoIds: [],
                total: 0,
                totalNum: 0,
                cartList: [],
                refreshing: false
            });
            fa.toast.show({
                title: fa.code.parse(cartModel.getException().getCode())
            })
        } else {
            const cartList = result.list;
            for (let i = 0; i < cartList.length; i++) {
                cartList[i]['goods_spec_string'] = cartList[i].goods_spec.map(function (item) {
                    return item.id > 0 ? `${item.name}:${item.value_name}` : ''
                }).join(',');
                if (cartList[i].is_check === true) {
                    checkedCartIds.push(cartList[i].id);
                    checkedGoodsSkuInfoIds.push(cartList[i].goods_sku_id);
                    total += parseFloat(cartList[i].goods_price).toFixed(2) * cartList[i].goods_num;
                    totalNum += cartList[i].goods_num
                }
                cartList[i]['remove_checked'] = fa.inArray(cartList[i].goods_sku_id, this.state.removeCheckSkuIds);
            }
            total = total.toFixed(2);
            this.setState({
                cartListLoadedState: true,
                checkedCartIds,
                checkedGoodsSkuInfoIds,
                total,
                totalNum,
                cartList,
                refreshing: false
            })
        }

    }

    async initGoodsInfo() {
        const result = await goodsModel.info({
            id: this.state.goodsId
        });
        if (result) {
            let goodsInfo = result.info;
            for (let i = 0; i < this.state.cartList.length; i++) {
                if (this.state.cartList[i].goods_sku_id === this.state.goodsSkuId) {
                    this.setState({
                        stepper: this.state.cartList[i].goods_num
                    });
                    break;
                }
            }
            this.setState({
                goodsInfo
            })
        } else {
            fa.toast.show({
                title: fa.code.parse(goodsModel.getException().getCode())
            })
        }
    }

    async onGoodsSkuMatchSuccess(e) {
        this.setState({
            goodsSkuInfo: e.detail.goodsSkuInfo
        });
        const cartGoods = await cartModel.info({ goods_sku_id: e.detail.goodsSkuInfo.id })
        if (cartGoods) {
            this.setState({
                cartGoods: cartGoods,
                inCartNumber: cartGoods.goods_num
            })
        }
    }

    async onGoodsSkuMatchFail(e) {
        this.setState({
            specIdValueIdsChecked: e.detail.specIdValueIdsChecked,
            goodsSkuInfo: null,
            cartGoods: null,
            inCartNumber: 0
        })
    }

    async changeSkuConfirm() {
        const stepper = this.state.stepper;
        const goodsSkuInfo = this.state.goodsSkuInfo;
        const specClickGoodsSkuId = this.state.specClickGoodsSkuId;
        const { userToken } = this.props;
        if (!goodsSkuInfo) {
            return false
        } else {
            if (stepper > goodsSkuInfo.stock) {
                fa.toast.show({
                    title: '库存不足' // todo 加入到code
                })
            } else {
                const cartLogic = new CartLogic();
                const result = await cartLogic.change(specClickGoodsSkuId, goodsSkuInfo.id, stepper)
                if (result !== false) {
                    this.initCartList({userToken});
                    this.toggleGoodsSkuSelect()
                } else {
                    fa.toast.show({
                        title: fa.code.parse(cartLogic.cartModel.getException().getCode())
                    })
                }
            }
        }
    }

}

// 占位图，登陆提示
const styles = StyleSheet.create({
    cartCardItem: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#FFFFFF',
    },
    cartCard: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: windowWidth - 30 - 16 - 15 - 75 - 10
    },
    cartCardImage: {
        width: 75,
        height: 75,
        marginRight: 10
    },
    cartCardCheck: {
        width: 16,
        height: 16,
        marginRight: 15,
        marginTop: 30
    },
    cartCardTitleSpec: {
        // width:windowWidth,
        // flexDirection: 'column',
        // flexWrap: 'wrap',
    },
    cartCardTitle: {
        color: '#333333',
        lineHeight: 20,
        marginBottom: 6,
        fontSize: 14,
        fontWeight: '800',
        fontFamily: 'PingFangSC-Regular',
    },
    cartCardSpec: {
        justifyContent: 'space-between',
    },
    cartCardSpecCanSkuSelect: {
        alignItems: 'center',
        padding: 5,
    },
    cartCardSpecText: {
        color: '#999',
        lineHeight: 11,
        height: 11,
        fontSize: 11,
        marginRight: 5,
    },
    cartCardPriceSpecImage: {
        width: 6,
        height: 6,
    },
    cartCardFooter: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
    },
    cartCardPrice: {
        lineHeight: 14,
        height: 14,
        color: '#FF635C',
        fontSize: 14,
        fontWeight: '800',
    },
    cartCardStepper: {
        width: 100
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 48,
        backgroundColor: '#FFF'
    },
    footerLeft: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 15,
    },
    footerAllAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerAllActionText: {
        marginRight: 20,
        marginLeft: 5,
        fontSize: 14,
        color: '#333',
    },
    footerTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerTotalText: {
        fontSize: 12,
        color: '#999',
    },
    footerTotalPrice: {
        fontSize: 14,
        color: ThemeStyle.ThemeColor,
        fontWeight: '800'
    },
})
