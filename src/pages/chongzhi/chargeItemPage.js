// 普通商品列表点进商品详情时，如果为多规格，则默认展示第一个规格，规格中如果有参与拼团的，则切换至该规格时刷新出拼团详情
// 从拼团商品列表点进商品详情时，如果为多规格，则默认展示拼团规格中的第一个

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from 'react-native';
import {connect} from "react-redux";
import {getGoodsDetail} from "../../actions/category";
import {stateHoc} from "../../utils";
import {ThemeStyle, windowWidth, PublicStyles} from '../../utils/style';
import {Carousel, Toast} from 'antd-mobile-rn'
import {
    Goods,
    Separator,
    BodyImage,
    Video,
    BodyText
} from '../../components/body'
import SpecList from '../../components/goods/specList'
import SpecModal from "../../components/goods/specModal";
import GoodsCollectModel from "../../models/goodsCollect";
import Badge from "@react-native-component/react-native-smart-badge";
import {NetworkImage} from "../../components/theme"
import ChargeSpecList from "../../components/goods/chargeSpecList";
// import WebHtmlView from "../../components/public/webHtmlView";

const goodsCollectModel = new GoodsCollectModel()
// const htmlContent = `
//     <div class="cap-richtext" color="#f9f9f9" content="" fullscreen="0" type="rich_text" __zent-design-uuid__="3d7cd6d3-ae9b-4a84-8af6-867c029f32a3" style="background-color: #ffffff;">
//     <p>点此编辑『富文本』内容 ——&gt;</p><p>你可以对文字进行<strong>加粗</strong>、<em>斜体</em>、<span style="text-decoration: underline;">下划线</span>、<span style="text-decoration: line-through;">删除线</span>、文字<span style="color: rgb(0, 176, 240);">颜色</span>、<span style="background-color: rgb(255, 192, 0); color: rgb(255, 255, 255);">背景色</span>、以及字号<span style="font-size: 20px;">大</span><span style="font-size: 14px;">小</span>等简单排版操作。</p><p>还可以在这里加入表格了</p><table><tbody><tr><td width="93" valign="top" style="word-break: break-all;">中奖客户</td><td width="93" valign="top" style="word-break: break-all;">发放奖品</td><td width="93" valign="top" style="word-break: break-all;">备注</td></tr><tr><td width="93" valign="top" style="word-break: break-all;">猪猪</td><td width="93" valign="top" style="word-break: break-all;">内测码</td><td width="93" valign="top" style="word-break: break-all;"><em><span style="color: rgb(255, 0, 0);">已经发放</span></em></td></tr><tr><td width="93" valign="top" style="word-break: break-all;">大麦</td><td width="93" valign="top" style="word-break: break-all;">积分</td><td width="93" valign="top" style="word-break: break-all;"><a href="javascript: void(0);" target="_blank">领取地址</a></td></tr></tbody></table><p style="text-align: left;"><span style="text-align: left;">也可在这里插入图片、并对图片加上超级链接，方便用户点击。</span></p>
//     <p>点此编辑『富文本』内容 ——&gt;</p><p>你可以对文字进行<strong>加粗</strong>、<em>斜体</em>、<span style="text-decoration: underline;">下划线</span>、<span style="text-decoration: line-through;">删除线</span>、文字<span style="color: rgb(0, 176, 240);">颜色</span>、<span style="background-color: rgb(255, 192, 0); color: rgb(255, 255, 255);">背景色</span>、以及字号<span style="font-size: 20px;">大</span><span style="font-size: 14px;">小</span>等简单排版操作。</p><p>还可以在这里加入表格了</p><table><tbody><tr><td width="93" valign="top" style="word-break: break-all;">中奖客户</td><td width="93" valign="top" style="word-break: break-all;">发放奖品</td><td width="93" valign="top" style="word-break: break-all;">备注</td></tr><tr><td width="93" valign="top" style="word-break: break-all;">猪猪</td><td width="93" valign="top" style="word-break: break-all;">内测码</td><td width="93" valign="top" style="word-break: break-all;"><em><span style="color: rgb(255, 0, 0);">已经发放</span></em></td></tr><tr><td width="93" valign="top" style="word-break: break-all;">大麦</td><td width="93" valign="top" style="word-break: break-all;">积分</td><td width="93" valign="top" style="word-break: break-all;"><a href="javascript: void(0);" target="_blank">领取地址</a></td></tr></tbody></table><p style="text-align: left;"><span style="text-align: left;">也可在这里插入图片、并对图片加上超级链接，方便用户点击。</span></p>
//     </div>
// `

@connect(({
              view: {
                  category: {
                      goodsDetailData,
                      goodsDetailFetchStatus,
                  }
              },
              app: {
                  user: {
                      login,
                      userInfo,
                      userToken,
                  }
              }
          }) => ({
    data: goodsDetailData,
    fetchStatus: goodsDetailFetchStatus ? goodsDetailFetchStatus : {},
    login,
    userInfo,
    userToken,
}))
@stateHoc({
    detail: true,
})
export default class ChargeItemPage extends Component {
    hocComponentDidMount() {
        const {
            navigation,
            fetchStatus,
            userToken,
        } = this.props;
        const {id} = navigation.state.params;
        this.props.dispatch(
            getGoodsDetail({
                params: {
                    id,
                    userToken
                },
                fetchStatus: fetchStatus ? fetchStatus[id] : null,
            })
        );
    }

    hocDetailKey() {
        return this.props.navigation.state.params.id;
    }

    render() {
        const {navigation, dispatch, login, userInfo, userToken} = this.props;
        const {id, cateType} = navigation.state.params;
        const data = this.props.data[id];

        return data ? <View style={PublicStyles.ViewMax}>
            <ScrollView style={{backgroundColor: "#f8f8f8"}}>
                <View style={{backgroundColor: '#ffffff'}}>
                    <ChargeSpecList
                        cateType={cateType ? cateType : null}
                        spec_list={data.spec_list ? data.spec_list : []}
                        skus={data.skus ? data.skus : []}
                        navigation={navigation}
                        dispatch={dispatch}
                        title={data.title}
                        login={login}
                        userInfo={userInfo}
                        userToken={userToken}
                        buyedNum={data.buyedNum}
                        buyedMoney={data.buyedMoney}
                        canBuy={data.canBuy}
                        canBuyNum={data.canBuyNum}
                        canBuyMoney={data.canBuyMoney}
                        userLevelInfo={data.userLevelInfo}
                    />
                </View>
            </ScrollView>
        </View> : null
    }

}

const styles = StyleSheet.create({
    chargeWrapper: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#F8F8F8",
        flexDirection: 'row',
        padding: 15,
        marginBottom: 15
    },
    listImg: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    SpecListWrapper: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#ffffff'
    },
    SpecItem: {
        flex: 1,
        borderColor: '#dedede',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 3,
        padding: 10,
        margin: 5,
        alignItems: 'center'
    },
    SpecTitle: {
        fontSize: 14,
    },
    SpecPrice: {
        fontSize: 14,
        color: '#989898',
    }
});

