import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import { EvaluateCard } from '../../components'
import FlatList from "../../components/flatList";
import { PublicStyles, ThemeStyle, windowWidth } from "../../utils/style";
import { GoodsEvaluateApi } from "../../config/api/goodsEvaluate";
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

export default class EvaluateList extends Component {
    state = {
        order_id: 0,
        evaluate_state: 'un_evaluate'
    }

    async componentWillMount() {
        const order_id = this.props.navigation.getParam('order_id')
        if (order_id > 0) {
            this.setState({
                order_id
            })
        }

    }

    onGoods(id) {
        this.props.navigation.navigate('GoodsDetail', { id })
    }

    onDetail(order_goods_id) {
        this.props.navigation.navigate('EvaluateDetail', { order_goods_id })

    }

    onAdd(order_goods_id) {
        this.props.navigation.navigate('EvaluateAdd', { order_goods_id, updateListRow: this.updateListRow })
    }

    onAdditional(order_goods_id) {
        this.props.navigation.navigate('EvaluateAdditional', { order_goods_id })
    }

    // 更新某条
    updateListRow = (id) => {
        this.FlatList.manuallyRefresh()
    }


    render() {
        const tabList = [
            {
                evaluate_state: 'un_evaluate',
                tabLabel: '待评价',
            }, {
                evaluate_state: 'is_evaluate',
                tabLabel: '已评价',
            }
        ]
        const { evaluate_state } = this.state
        let params = {}
        if (evaluate_state) {
            params['evaluate_state'] = params
        }
        return (
            <View style={[PublicStyles.ViewMax]}>
                <ScrollableTabView
                    style={{ backgroundColor: '#fff', flex: 0 }}
                    initialPage={0}
                    renderTabBar={() =>
                        <DefaultTabBar
                            style={{
                                borderWidth: 0,
                                borderColor: 'rgba(0,0,0,0)'
                            }}
                            tabStyle={{ paddingBottom: 0 }}
                        />
                    }
                    tabBarActiveTextColor={ThemeStyle.ThemeColor}
                    tabBarInactiveTextColor='#666'
                    tabBarUnderlineStyle={{
                        width: windowWidth * 0.75 / 2,
                        left: windowWidth / 14,
                        backgroundColor: `${ThemeStyle.ThemeColor}`,
                        height: 3,
                        borderRadius: 4,
                    }}
                    tabBarTextStyle={{}}
                    onChangeTab={({ i }) => {
                        if (i === 0) {
                            this.FlatList.setFetchParams({
                                evaluate_state: 'un_evaluate',
                            })
                        } else if (i === 1) {
                            this.FlatList.setFetchParams({
                                evaluate_state: 'is_evaluate',
                            })
                        }
                    }}
                >
                    {
                        tabList.map((item, index) => (
                            <View
                                key={index}
                                tabLabel={item.tabLabel}
                            />
                        ))
                    }
                </ScrollableTabView>
                <FlatList
                    ref={e => this.FlatList = e}
                    keyExtractor={e => String(e.id)}
                    api={GoodsEvaluateApi.mine}
                    fetchParams={params}
                    renderItem={({ item }) => (
                        <EvaluateCard
                            goodsInfo={item}
                            onGoods={() => {
                                this.onGoods(item.goods_id)
                            }}
                            onAdd={() => {
                                this.onAdd(item.id)
                            }}
                            onDetail={() => {
                                this.onDetail(item.id)
                            }}
                            onAdditional={() => {
                                this.onAdditional(item.id)
                            }}
                        />
                    )}
                />
            </View>
        );
    }

}
const styles = StyleSheet.create({})
