import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import {PublicStyles} from '../../utils/style';
import {connect} from "react-redux";
import {List} from "antd-mobile-rn";
import FlatList from "../../components/flatList";
import {ChargeApi} from "../../config/api/charge";
import {NetworkImage} from "../../components/theme";

const Item = List.Item;
@connect(({
              app: {
                  user: {
                      userToken,
                  }
              }
          }) => ({
    userToken,
}))
export default class ChargeListPage extends Component {

    render() {
        const {navigation, userToken} = this.props;
        const {cateType} = navigation.state.params;
        let params = {
            page: 1,
            rows: 20,
            cateType,
        };
        {
            userToken ? Object.assign(params, {userToken}) : params
        }
        return (
            <View style={PublicStyles.ViewMax}>
                <Item style={{flexDirection: 'row', justifyContent: "center"}} arrow="down">
                    {cateType === 'tencent' ? 'QQ充值列表' :
                        cateType === 'online-game' ? '游戏充值列表' :
                            cateType === 'oil' ? '加油卡' :
                            cateType === 'video' ? '视频会员' :
                            cateType === 'live' ? '直播平台' :
                            cateType === 'gift-card' ? '礼品卡' :
                                null}
                </Item>
                <View style={{backgroundColor: '#ffffff'}}>
                    <ScrollView>
                        <FlatList
                            ref={e => this.FlatList = e}
                            keyExtractor={e => String(e.id)}
                            api={ChargeApi.list}
                            fetchParams={params}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    key={`charge_item_${item.id}`}
                                    style={styles.listWarp}
                                    onPress={() => this.goDetail(item.id, cateType)}
                                >
                                    <View style={styles.chargeWrapper}>
                                        <NetworkImage style={styles.listImg} source={{uri: item.img}}/>
                                        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                                            <Text style={{fontSize: 14}}>{item.title}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </ScrollView>

                </View>
            </View>
        );
    }

    goDetail(id, cateType) {
        this.props.navigation.navigate('ChargeItemPage', {
            id,
            cateType
        })
    }
}
const styles = StyleSheet.create({
    chargeWrapper: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#F8F8F8",
        flexDirection: 'row',
        padding: 15
    },
    listImg: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
});
