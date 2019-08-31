import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {PublicStyles} from '../../utils/style';
import {GoodsCollectApi} from "../../config/api/goodsCollect";
import FlatList from "../../components/flatList";
import GoodsItem from "../../components/goods/item";
import {connect} from "react-redux";

@connect(({
              app: {
                  user: {
                      userToken,
                  }
              }
          }) => ({
    userToken,
}))
export default class GoodsCollect extends Component {
    render() {
        const {navigation, userToken} = this.props;
        return <View style={PublicStyles.ViewMax}>
            <FlatList
                ref={e => this.FlatList = e}
                keyExtractor={e => String(e.id)}
                api={GoodsCollectApi.list}
                fetchParams={{userToken: userToken}}
                numColumns={2}
                renderItem={({item, index}) => (
                    <GoodsItem
                        data={item}
                        index={index}
                        onPress={() => {
                            navigation.navigate("GoodsDetail", {
                                id: item.id
                            });
                        }}
                    />
                )}
            />
        </View>
    }
}
const styles = StyleSheet.create({})
