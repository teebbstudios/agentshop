import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Toast } from '../../utils/function';
import { List } from 'antd-mobile-rn';
import { Fetch } from '../../utils';
import { connect } from "react-redux";
import { sendWechatAuthRequest, wechatBind } from '../../actions/app/wechat';
import { updateUserInfo } from '../../actions/user';
import { UserApi } from '../../config/api/user';

const Item = List.Item;
@connect(
    ({ app: { user: {
        userInfo,
    } } }) => ({
        userInfo,
    })
)
export default class UserRelation extends Component {
    render() {
        const { navigation } = this.props;
        const {
            userInfo,
            dispatch
        } = this.props
        const {
            phone,
            wechat_openid,
        } = userInfo || {}
        const isBindPhone = !!(phone && phone.length)
        const isBindWechat = !!(wechat_openid && wechat_openid.length)
        return (
            <View>
                <List>
                    <Item
                        thumb={
                            <Image
                                source={require('../../images/phone.png')}
                                style={styles.image1}
                            />
                        }
                        extra={(
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: isBindPhone ? '#999' : '#ccc'
                                }}
                            >
                                {
                                    isBindPhone ? '已绑定' : '未绑定'
                                }
                            </Text>
                        )}
                        style={{
                            borderBottomColor: '#eaeaea',
                            borderBottomWidth: 0.5
                        }}
                        arrow="horizontal"
                        onClick={() => {
                            if (isBindPhone) {
                                Alert.alert(
                                    '是否要解除关联手机？',
                                    '',
                                    [
                                        {
                                            text: '取消',
                                            onPress: () => { }
                                        },
                                        {
                                            text: '确定',
                                            onPress: async () => {
                                                if (isBindWechat) {
                                                    const e = await Fetch.fetch({
                                                        api: UserApi.unbindPhone,
                                                    })
                                                    if (e.code === 0) {
                                                        Toast.warn('解除关联成功')
                                                        dispatch(updateUserInfo())
                                                    } else {
                                                        Toast.warn(e.errmsg)
                                                    }
                                                } else {
                                                    Toast.warn('您当前还未关联过其他验证方式，所以无法解除手机')
                                                }
                                            }
                                        }
                                    ]
                                );
                            } else {
                                navigation.navigate('UserbindingView')
                            }
                        }}
                    >
                        <View style={{height: 60, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 17, color: '#333' }}>
                                手机号
                            </Text>
                        </View>
                    </Item>
                    <Item
                        thumb={
                            <Image
                                source={require('../../images/wechat.png')}
                                style={styles.image1}
                            />
                        }
                        extra={(
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: isBindWechat ? '#999' : '#ccc'
                                }}
                            >
                                {
                                    isBindWechat ? '已绑定' : '未绑定'
                                }
                            </Text>
                        )}
                        onClick={async () => {
                            if (isBindWechat) {
                                Alert.alert(
                                    '是否要解除关联微信？',
                                    '',
                                    [
                                        {
                                            text: '取消',
                                            onPress: () => { }
                                        },
                                        {
                                            text: '解除关联',
                                            onPress: async () => {
                                                if (isBindPhone) {
                                                    const e = await Fetch.fetch({ api: UserApi.unbindWechat })
                                                    if (e.code == 0) {
                                                        Toast.info('解除关联成功')
                                                        dispatch(updateUserInfo())
                                                    } else {
                                                        Toast.error(e.errmsg)
                                                    }
                                                } else {
                                                    Toast.warn('您当前还未关联过其他验证方式，所以无法解除微信')
                                                }
                                            }
                                        },
                                    ]
                                );
                            } else {
                                try {
                                    const {
                                        tokenData,
                                        userData,
                                    } = await sendWechatAuthRequest()
                                    dispatch(wechatBind({
                                        tokenData,
                                        userData,
                                    }))
                                } catch (e) {
                                    console.log(e);
                                }
                            }
                        }}
                        arrow="horizontal"
                    >
                        <View style={{ height: 60, justifyContent: 'center' }}>
                            <Text style={{fontSize: 17, color: '#333'}}>
                                微信
                            </Text>
                        </View>
                    </Item>
                </List>
                <View style={styles.botTextView}>
                    <Text style={styles.botText}>
                        账号关联之后，用户可使用微信、QQ或手机号登录 德了宠物 。
                    </Text>
                    <Text style={styles.botText}>
                        在各个渠道进行租房时，均可同步 德了宠物 账号，享受 德了宠物 特权，同步订单信息。
                    </Text>
                    <Text style={styles.botText}>
                        德了宠物 承诺保障您的账号隐私安全。
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image1: {
        height: 40,
        width: 40,
        marginRight: 10
    },
    botTextView: {
        paddingVertical: 26,
        paddingHorizontal: 15
    },
    botText: {
        fontSize: 14,
        color: '#999999',
        fontFamily: 'PingFangSC-Regular',
        lineHeight: 22,
    },
    item:{
        // height: 60,
    }
})
export default UserRelation;
