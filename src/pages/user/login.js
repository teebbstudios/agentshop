import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    View,
    Keyboard,
    KeyboardAvoidingView,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import {Toast} from '../../utils/function';
import {
    PublicStyles,
    ThemeStyle
} from '../../utils/style';
import {connect} from "react-redux";
import {userLogin, updateUserInfo} from "../../actions/user";
import {env} from "../../config";
import {UserApi} from "../../config/api/user";
import Fetch from "../../utils/fetch";
import {sendWechatAuthRequest, wechatLogin} from '../../actions/app/wechat';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Button} from '../../components/theme'
import fa from '../../utils/fa'
import {getHomeView} from '../../actions/home';
@connect(({
              app: {
                  wechat: {
                      isWXAppInstalled,
                  }
              }
          }) => ({
    isWXAppInstalled,
}))
export default class UserLogin extends Component {
    state = {
        // username: '13502176003',
        // password: '123456',
        username: null,
        password: null,
    };

    render() {
        const {
            navigation,
            isWXAppInstalled,
            dispatch,
        } = this.props;
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
                                placeholder={'手机号或账号'}
                                onChangeText={(e) => {
                                    this.state.username = e
                                }}
                                value={this.state.username}
                                underlineColorAndroid={'transparent'}
                                placeholderTextColor={'#CCCCCC'}
                            />
                        </View>
                        <View style={styles.view1}>
                            <TextInput
                                style={styles.textInput1}
                                value={this.state.password}
                                placeholder={'密码'}
                                secureTextEntry={true}
                                onChangeText={(e) => {
                                    this.state.password = e
                                }}
                                underlineColorAndroid={'transparent'}
                                placeholderTextColor={'#CCCCCC'}
                            />
                        </View>
                        <View style={styles.View5}>
                            <Text
                                style={styles.text5}
                                onPress={() => navigation.navigate('UserFindPassword')}
                            >
                                忘记密码
                            </Text>
                            <Text
                                style={styles.text5}
                                onPress={() => navigation.navigate('UserRegister')}
                            >
                                账号注册
                            </Text>
                        </View>
                        <Button
                            onClick={() => {
                                Keyboard.dismiss()
                                this.login()
                            }}
                            type='primary'
                        >
                            登 录
                        </Button>
                        {
                            // isWXAppInstalled && (
                            // 	<View>
                            // 		<View style={styles.view3}>
                            // 			<Text style={styles.text3}>快捷登录</Text>
                            // 		</View>
                            // 		<View style={styles.View4}>
                            // 			<TouchableOpacity
                            // 				style={styles.weiViewcss}
                            // 				activeOpacity={1}
                            // 				onPress={async()=>{
                            // 					try {
                            // 						const {
                            // 							tokenData,
                            // 							userData,
                            // 						} = await sendWechatAuthRequest()
                            // 						dispatch(wechatLogin({
                            // 							tokenData,
                            // 							userData,
                            // 						}))
                            // 					} catch (e) {
                            // 						console.log(e);
                            // 					}
                            // 				}}
                            // 			>
                            // 				<Image
                            // 					source={require('../../images/weixin.png')}
                            // 					style={{ width:25, height:25 }}
                            // 				/>
                            // 			</TouchableOpacity>
                            // 		</View>
                            // 	</View>
                            // )
                        }
                    </View>
                </KeyboardAwareScrollView>
                <SafeAreaView>
                    {/*<TouchableOpacity*/}
                    {/*	style={{*/}
                    {/*		flexDirection: 'row',*/}
                    {/*		alignItems: 'center',*/}
                    {/*		justifyContent: 'center',*/}
                    {/*		marginBottom: 10*/}
                    {/*	}}*/}
                    {/*	onPress={() => {*/}
                    {/*		navigation.navigate('PublicWebView', {*/}
                    {/*			title: '用户协议',*/}
                    {/*			url: "https://www.fashop.cn/agreement.html"*/}
                    {/*		})*/}
                    {/*	}}*/}
                    {/*>*/}
                    {/*	<Text style={{ color: '#999' }}>登录代表已阅读并同意</Text>*/}
                    {/*	<Text style={{ color: '#666' }}>《用户协议》</Text>*/}
                    {/*</TouchableOpacity>*/}
                </SafeAreaView>
            </View>
        )
    }

    async login() {
        const {
            username,
            password,
        } = this.state

        if (!username) {
            return Toast.warn('请输入用户名')
        }
        if (!password) {
            return Toast.warn('请输入密码')
        }

        const params = {
            username,
            password,
            login_type: "password"
        };
        const e = await Fetch.fetch({
            api: UserApi.login,
            params
        });
        if (e.code === 0) {
            Toast.success(e.msg);
            const {dispatch} = this.props;
            await dispatch(
                userLogin({
                    user_token: e.result
                })
            );
            await dispatch(getHomeView());
        } else {
            Toast.warn(e.msg)
        }

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
