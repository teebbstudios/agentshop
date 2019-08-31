import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import {Toast} from "../../utils/function";
import {
    PublicStyles,
} from "../../utils/style";
import {connect} from "react-redux";
import {Fetch} from '../../utils';
import {List, InputItem, Button} from "antd-mobile-rn";
import {passiveModifyUserInfo} from "../../actions/user";
import {UserApi} from "../../config/api/user";

@connect(
    ({
         app: {
             user: {
                 login,
                 userInfo,
             }
         }
     }) => ({
        login,
        userInfo,
    }),
)
export default class UserChangePassword extends Component {
    state = {
        oldpassword: null,
        password: null,
        repassword: null,
    };

    render() {
        const {
            navigation,
            dispatch,
        } = this.props;
        return (
            <View style={PublicStyles.ViewMax}>
                <List>
                    <InputItem
                        placeholder="请填写旧密码"
                        clear
                        onChange={(e) => {
                            this.state.oldpassword = e
                        }}
                        labelNumber={5}
                    >
                        旧密码
                    </InputItem>
                    <InputItem
                        placeholder="请填写新密码"
                        clear
                        onChange={(e) => {
                            this.state.password = e
                        }}
                        labelNumber={5}
                    >
                        新密码
                    </InputItem>
                    <InputItem
                        placeholder="请填写新密码"
                        clear
                        onChange={(e) => {
                            this.state.repassword = e
                        }}
                        labelNumber={5}
                    >
                        确认新密码
                    </InputItem>
                </List>
                <Button
                    onClick={async () => {
                        const {
                            oldpassword,
                            password,
                            repassword,
                        } = this.state;
                        const {userToken} = this.props;
                        if (!oldpassword) {
                            return Toast.warn('请填写旧密码')
                        }
                        if (!password) {
                            return Toast.warn('请填写新密码')
                        }
                        if (!repassword) {
                            return Toast.warn('请填写新密码')
                        }
                        if (password !== repassword) {
                            return Toast.warn('两次密码不一致')
                        }
                        const e = await Fetch.fetch({
                            api: UserApi.editPassword,
                            params: {
                                userToken,
                                oldpassword,
                                password,
                                repassword,
                            }
                        });
                        if (e.code === 0) {
                            Toast.success('修改成功')
                            dispatch(passiveModifyUserInfo({
                                data: e.data
                            }));
                            navigation.goBack()
                        } else {
                            Toast.warn(e.msg)
                        }
                    }}
                    style={{
                        marginTop: 15,
                        marginHorizontal: 15,
                    }}
                    type={"primary"}
                >
                    确认修改
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text1: {
        fontSize: 13,
        lineHeight: 17,
    },
});
