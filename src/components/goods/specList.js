import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView
} from "react-native";
import { Button } from "antd-mobile-rn";
import { windowWidth, PublicStyles, ThemeStyle } from '../../utils/style';
// import SafeAreaView from "react-native-safe-area-view";
import Stepper from "./stepper";
import { NetworkImage } from "../theme";
import { add, edit, exist, info } from "../../actions/cart";

export default class GoodsSpecList extends Component{
    state = {
        spec_sign: [],
        spec_value_sign: [],
        current_sku: null,
        quantity: 1
    }
    componentDidMount(){
        const { skus } = this.props
        if(skus){
            this.setState({
                spec_sign: JSON.parse(skus[0].spec_sign),
                spec_value_sign: JSON.parse(skus[0].spec_value_sign),
                current_sku: skus[0],
            })
        }
    }
    render() {
        const { spec_sign, spec_value_sign, quantity, current_sku } = this.state;
        const { spec_list, skus, if_cart, title, login, navigation } = this.props;
        return <View style={{flex: 1}}>
            <View style={styles.popModalTitleView}>
                {
                    current_sku ? <NetworkImage
                        source={{ uri: current_sku.img }}
                        style={styles.popModalTitleLeft}
                    /> : <View style={styles.popModalTitleLeft} />
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
                    spec_list && spec_list.length &&spec_list[0].id ? spec_list.map((spec_list_item, i) => {
                        const family_selected_data = spec_list_item.value_list.find((brotherItem) => {
                            if (spec_value_sign.indexOf(brotherItem.id) > -1) {
                                return {
                                    selected_index: spec_value_sign.indexOf(brotherItem.id),
                                }
                            }
                        })
                        return (
                            <View key={i} style={[styles.specItemView, { borderTopWidth: i === 0 ? 0 : .5 }]}>
                                <View style={[PublicStyles.rowCenter, { marginBottom: 18 }]}>
                                    <Text style={PublicStyles.descFour9}>
                                        {spec_list_item.name}
                                    </Text>
                                    {
                                        family_selected_data ? null :
                                        <Text style={[PublicStyles.descTwo6, { marginLeft: 10, color: ThemeStyle.ThemeColor }]}>
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
                                                        if (family_selected_data&&!selected) {
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
                                                            return item.spec_value_sign === JSON.stringify(new_spec_value_sign.sort((a, b) => { return a - b }))
                                                        })
                                                        this.setState({
                                                            spec_value_sign: new_spec_value_sign.sort((a, b) => { return a - b }), // 升序
                                                            quantity: 1, // 每次选择要把数量变为1
                                                            current_sku: current_skus
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
                        if(login){
                            if (if_cart) {
                                this.changeCart()
                            } else {
                                this.buyNow()
                            }
                        }else {
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
        const { current_sku, quantity } = this.state
        const { dispatch, closeModal } = this.props;
        const e = await info({
            params: {
                goods_sku_id: current_sku.id
            }
        })
        const params = {
            goods_sku_id: current_sku.id,
            quantity: e ? e.info.goods_num+quantity : quantity
        }
        const if_exist = await exist({
            params: {
                goods_sku_id: current_sku.id
            }
        })
        if(if_exist){
            dispatch(edit({params}))
        }else{
            dispatch(add({params}))
        }
        closeModal()
    }
    buyNow = async () => {
        const { current_sku, quantity } = this.state
        const { dispatch, closeModal, navigation } = this.props;
        const params = {
            goods_sku_id: current_sku.id,
            quantity
        }
        const if_exist = await exist({
            params: {
                goods_sku_id: current_sku.id
            }
        })
        if (if_exist) {
            dispatch(edit({ params }))
        } else {
            dispatch(add({ params }))
        }
        const e = await info({
            params: {
                goods_sku_id: current_sku.id
            }
        })
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
        height: 45,
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
        shadowOffset: { width: 5, height: 0 },
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
    specItemView:{
        alignItems: 'flex-start',
        paddingTop: 18,
        flexShrink: 0,
        borderTopColor: '#eaeaea'
    },
    itemView:{
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

    SpecListView:{
        padding: 15,
        paddingBottom: 0,
    },
    SpecListBtnView:{
        flexDirection: 'row',
    },
    SpecListNumView:{
        paddingVertical: 12,
        borderTopWidth: .5,
        borderTopColor: '#eaeaea'
    },
});
