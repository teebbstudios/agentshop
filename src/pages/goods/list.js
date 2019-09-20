import React, { Component } from 'react';
import { View } from 'react-native';
import GoodsItem from "../../components/goods/item";
import { PublicStyles } from '../../utils/style';
import FlatList from "../../components/flatList";
import { GoodsApi } from '../../config/api/goods'
import { SearchBar } from 'antd-mobile-rn'

export default class GoodsList extends Component {
    render() {
        const { navigation } = this.props;
        const { category_id, keywords, autoFocus } = navigation.state.params;
        return <View style={PublicStyles.ViewMax}>
            <FlatList
                ref={e => this.FlatList = e}
                keyExtractor={e => String(e.id)}
                numColumns={2}
                ListHeaderComponent={(
                    <SearchBar
                        placeholder='搜索'
                        returnKeyType='search'
                        autoFocus={autoFocus}
                        showCancelButton={false}
                        defaultValue={keywords}
                        onSubmit={value => {
                            this.FlatList.setFetchParams({
                                keywords: value
                            })
                        }}
                    />
                )}
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
                fetchParams={{
                    category_ids: [parseInt(category_id)],
                    keywords
                }}
            />
        </View>;
    }
}
