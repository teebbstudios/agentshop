import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    TextInput
} from 'react-native';
import { List, Modal, DatePicker } from "antd-mobile-rn";
import { modifyUserInfo, updateUserInfo, userLogout } from "../../actions/user";
import { PublicStyles, ThemeStyle } from '../../utils/style';
import { imagePicker } from '../../utils/imagePickerModule';
import { Button } from "../../components/theme";
import Avatar from "../../components/public/avatar";
import Fetch from '../../utils/fetch';
import { Toast } from '../../utils/function';
import { UserApi } from '../../config/api/user';
import moment from "moment";

const Item = List.Item;

@connect(
    ({ app: { user: {
        login,
        userInfo,
    }}}) => ({
        login,
        userInfo,
    }),
)
export default class UserInfo extends Component {
    static navigationOptions = ({ navigation }) => {
        const { onPress } = navigation.state.params || {};
        return {
            headerRight: <TouchableOpacity
                activeOpacity={.8}
                style={{ marginRight: 15 }}
                onPress={onPress}
            >
                <Text style={[PublicStyles.boldTitle, { color: ThemeStyle.ThemeColor }]}>退出</Text>
            </TouchableOpacity>
        }
    }
    state = {
        avatar: null,
        nickname: null,
        sex: null,
        birthday: null,
    }
    componentDidMount(){
        const { navigation, dispatch } = this.props
        navigation.setParams({
            onPress: this.logout,
        })
        dispatch(updateUserInfo());
    }
    render() {
        const { userInfo, navigation } = this.props
        const { profile } = userInfo || { profile: {} }
        const { avatar, nickname, sex, birthday } = this.state;
        return (
            <View style={PublicStyles.ViewMax}>
                <ScrollView>
                    <List>
                        <Item
                            extra={
                                <Avatar
                                    avatar={avatar ? avatar : profile.avatar}
                                />
                            }
                            arrow="horizontal"
                            onClick={() => {
                                imagePicker(
                                    (e) => {
                                        if (e.code === 0) {
                                            this.setState({
                                                avatar: e.data.url
                                            })
                                        } else {
                                            Toast.warn('上传图片异常')
                                        }
                                    },
                                    {
                                        type: 'user_avatar'
                                    }
                                )
                            }}
                        >
                            头像
                        </Item>
                        <Item
                            arrow="horizontal"
                            extra={<TextInput
                                placeholder="请输入昵称"
                                defaultValue={profile.nickname}
                                underlineColorAndroid={'transparent'}
                                placeholderTextColor={'#CCCCCC'}
                                onChangeText={(e) => {
                                    this.setState({
                                        nickname: e
                                    })
                                }}
                                style={{ fontSize: 17, color: '#888', textAlign: 'right', minWidth: 100 }}
                            />}
                        >
                            昵称
                        </Item>
                        <Item
                            arrow="horizontal"
                            extra={<TextInput
                                placeholder="请选择性别"
                                defaultValue={profile.sex ? '男' : '女'}
                                value={(sex===null ? profile.sex : sex) ? '男' : '女'}
                                underlineColorAndroid={'transparent'}
                                placeholderTextColor={'#CCCCCC'}
                                editable={false}
                                style={{ fontSize: 17, color: '#888', textAlign: 'right', minWidth: 100 }}
                            />}
                            onClick={() => {
                                Modal.operation([
                                    { text: '男', onPress: () => this.setState({ sex: 1 }) },
                                    { text: '女', onPress: () => this.setState({ sex: 0 }) },
                                ])
                            }}
                        >
                            性别
                        </Item>
                    </List>
                    <List style={{ marginTop: 10 }}>
                        <DatePicker
                            mode="date"
                            title="生日"
                            extra="立即补充"
                            value={(birthday===null ? profile.birthday : birthday) ? new Date(birthday===null ? profile.birthday : birthday) : null}
                            minDate={new Date("1900-01-01")}
                            onChange={date => {
                                this.setState({
                                    birthday: moment(date).format('YYYY-MM-DD')
                                })
                            }}
                        >
                            <Item arrow="horizontal">生日</Item>
                        </DatePicker>
                    </List>
                </ScrollView>
                <SafeAreaView>
                    <Button
                        type='primary'
                        disabled={
                            (avatar === null) && 
                            (nickname === null) && 
                            (sex === null) && 
                            (birthday === null)
                        }
                        style={{ margin: 15 }}
                        onClick={this.submit}
                    >
                        保 存
                    </Button>
                </SafeAreaView>
            </View>
        )
    }
    logout = async() => {
        const e = await Fetch.fetch({
            api: UserApi.logout
        })
        if(e.code===0){
            this.props.dispatch(userLogout())
        }
    }
    submit = () => {
        const { avatar, nickname, sex, birthday } = this.state;
        const { dispatch } = this.props
        dispatch(modifyUserInfo({
            params: {
                avatar,
                nickname,
                sex,
                birthday
            }
        }))
    }
}

const styles = StyleSheet.create({
    avatarView: {
        height: 28,
        width: 28,
        borderRadius: 14,
        overflow: 'hidden'
    },
    avatar: {
        height: 28,
        width: 28,
    },
    defaultAvatar: {
        width: 12,
        height: 14,
    },
    cleanerList: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#fff'
    },
    botAgent: {
        paddingVertical: 23,
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: '#EAEAEA',
    },
    textLeft: {
        fontSize: 16,
        color: '#333333',
    },
    textright: {
        fontSize: 16,
        color: '#999999',
    }
})
