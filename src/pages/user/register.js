import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    ScrollView,
    Keyboard,
} from 'react-native';
import {Toast} from '../../utils/function';
import Fetch from "../../utils/fetch";
import {env} from "../../config";
import {
    PublicStyles,
    ThemeStyle
} from '../../utils/style';
import {CountdownButton} from '../../utils/view';
import {userLogin} from '../../actions/user';
import {Button, InputItem} from 'antd-mobile-rn';
import SafeAreaView from 'react-native-safe-area-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {UserApi} from '../../config/api/user';

@connect(({
              app: {
                  user: {
                      login,
                  }
              }
          }) => ({
    login,
}))
export default class UserRegister extends Component {
    state = {
        username: null,
        verify_code: null,
        password: null,
        secureTextEntry: true
    };
    submit = async () => {
        const {dispatch} = this.props;
        const {navigation} = this.props;
        const {
            username,
            verify_code,
            password,
        } = this.state;
        const e = await Fetch.fetch({
            api: UserApi.register,
            params: {
                username,
                verify_code,
                password,
                channel_type: "sms",
            }
        });
        if (e.code === 0) {
            dispatch(
            	userLogin({
                    user_token: e.result
            	})
            );
            Toast.success(e.msg);
            // navigation.navigate('UserLogin');
        } else {
            Toast.warn(e.msg);
        }
    };

    render() {
        const {
            navigation,
        } = this.props;
        const {username, secureTextEntry} = this.state;
        return (
            <View style={PublicStyles.ViewOut}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps={'handled'}
                >
                    <View
                        style={{
                            paddingHorizontal: 30,
                        }}
                    >
                        <View style={styles.logoView}>
                            <Image
                                source={require('../../images/login-logo.png')}
                                style={styles.logo}
                            />
                        </View>
                        <View style={styles.view1}>
                            <TextInput
                                style={styles.textInput1}
                                placeholder={'请输入手机号'}
                                onChangeText={(e) => this.setState({username: e})}
                                underlineColorAndroid={'transparent'}
                                placeholderTextColor={'#CCCCCC'}
                            />
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    alignSelf: 'center',
                                    right: 5
                                }}
                            >
                                <CountdownButton
                                    api={UserApi.verifyCode}
                                    getParams={() => {
                                        return {
                                            channel_type: "sms",
                                            behavior: "register", // register注册 findPassword找回密码 editPassword修改密码 bindPhone绑定手机
                                            receiver: username,
                                        }
                                    }}
                                    getData={(e) => {
                                        if (e.code === 0) {
                                            Toast.info('验证码已发送')
                                        } else {
                                            Toast.warn(e.msg)
                                        }
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.view1}>
                            <TextInput
                                style={styles.textInput1}
                                placeholder={'请输入验证码'}
                                onChangeText={(e) => {
                                    this.state.verify_code = e
                                }}
                                value={this.state.verify_code}
                                underlineColorAndroid={'transparent'}
                                placeholderTextColor={'#CCCCCC'}
                            />
                        </View>
                        <View style={styles.view1}>
                            <TextInput
                                style={styles.textInput1}
                                value={this.state.password}
                                placeholder={'设置密码(必须包含数字和字母)'}
                                secureTextEntry={secureTextEntry}
                                onChangeText={(e) => {
                                    this.state.password = e
                                }}
                                underlineColorAndroid={'transparent'}
                                placeholderTextColor={'#CCCCCC'}
                            />
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    alignSelf: 'center',
                                    right: 10
                                }}
                                onPress={() => {
                                    this.setState({
                                        secureTextEntry: !secureTextEntry
                                    })
                                }}
                            >
                                <Image
                                    resizeMode='contain'
                                    source={require('../../images/yan.png')}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        transform: [{rotateX: secureTextEntry ? '0deg' : '180deg'}]
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.View5}>
                            <Text
                                style={styles.text5}
                                onPress={() => navigation.navigate('YiSiPage')}
                            >
                                用户协议及隐私声明
                            </Text>
                        </View>
                        <Button
                            onClick={this.submit}
                            type='primary'
                        >
                            同意用户协议及隐私声明并注册
                        </Button>
                    </View>
                </KeyboardAwareScrollView>
                {/*<SafeAreaView>*/}
                {/*	<TouchableOpacity*/}
                {/*		style={{*/}
                {/*			flexDirection: 'row',*/}
                {/*			alignItems: 'center',*/}
                {/*			justifyContent: 'center',*/}
                {/*			marginBottom: 10*/}
                {/*		}}*/}
                {/*		onPress={() => {*/}
                {/*			navigation.navigate('PublicWebView', {*/}
                {/*				title: '用户协议',*/}
                {/*				url: "https://www.fashop.cn/agreement.html"*/}
                {/*			})*/}
                {/*		}}*/}
                {/*	>*/}
                {/*		<Text style={{ color: '#999' }}>注册代表您已阅读并同意</Text>*/}
                {/*		<Text style={{ color: '#666' }}>《用户协议》</Text>*/}
                {/*	</TouchableOpacity>*/}
                {/*</SafeAreaView>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput1: {
        flex: 1,
        padding: 0,
        fontSize: 16,
        color: '#333',
        height: 45,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eaeaea'
    },
    view1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    text1: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
    },
    view2: {
        justifyContent: 'center',
        marginTop: 40,
    },
    view3: {
        alignItems: 'center',
        marginTop: 30,
    },
    text3: {
        fontSize: 14,
        color: '#999999',
    },
    logoView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 46
    },
    logo: {
        width: 129,
        height: 43,
    },
    criclecss: {
        width: 60, height: 60, backgroundColor: '#F4F4F4', borderRadius: 30,
        alignItems: 'center', justifyContent: 'center',
    },
    buttonView: {
        height: 44,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: '#FF7541',
        borderWidth: 0,
    },
    logintext: {
        color: '#fff',
    },
    View4: {
        alignItems: 'center',
        marginTop: 20,
    },
    weiViewcss: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#EAEAEA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    View5: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 26,
        alignItems: 'center'
    },
    text4: {
        color: '#999999',
        fontSize: 15,
        textDecorationLine: 'underline',
    },
    text5: {
        color: ThemeStyle.ThemeColor,
        fontSize: 14,
        fontFamily: 'PingFangSC-Regular',
    }
});

