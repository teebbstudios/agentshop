import React, {Component} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet, TextInput,
    View,
} from 'react-native';
import {PublicStyles} from '../../utils/style';
import {connect} from "react-redux";
import {modifyUserCustomDiscount, modifyUserInfo, updateUserInfo} from "../../actions/user";
import {List} from "antd-mobile-rn";
import {Button} from "../../components/theme";

const Item = List.Item;

@connect(({
              app: {
                  user: {
                      userInfo,
                      userToken,
                  }
              }
          }) => ({
    userInfo,
    userToken,
}))
export default class CustomDiscount extends Component {
    state: {
        customDiscount: null,
    };

    componentDidMount(): void {
        const {userInfo} = this.props;
        this.setState({
            customDiscount: userInfo.customDiscount === null ? 1 : userInfo.customDiscount
        })
    }

    render() {
        const {userInfo} = this.props;
        return (
            <View style={PublicStyles.ViewMax}>
                <ScrollView>
                    <Item
                        arrow="horizontal"
                        extra={<TextInput
                            placeholder="请输入折扣,格式:0.95"
                            defaultValue={userInfo.customDiscount === null ? '' : `${userInfo.customDiscount}`}
                            underlineColorAndroid={'transparent'}
                            placeholderTextColor={'#CCCCCC'}
                            onChangeText={(e) => {
                                this.setState({
                                    customDiscount: e
                                })
                            }}
                            style={{fontSize: 17, color: '#888', textAlign: 'right', minWidth: 100}}
                        />}
                    >
                        自定义显示折扣
                    </Item>
                </ScrollView>
                <SafeAreaView>
                    <Button
                        type='primary'
                        style={{margin: 15}}
                        onClick={this.submit}
                    >
                        保 存
                    </Button>
                </SafeAreaView>
            </View>
        );
    }

    submit = () => {
        const {customDiscount} = this.state;
        const {dispatch, userToken} = this.props;
        dispatch(modifyUserCustomDiscount({
            params: {
                customDiscount,
                userToken,
            }
        }))
    };

}
const styles = StyleSheet.create({})
