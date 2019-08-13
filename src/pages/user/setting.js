import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { Button, List } from 'antd-mobile-rn';
import { userLogout } from '../../actions/user';
import { Button } from "../../components/theme";
import { PublicStyles } from '../../utils/style'

const Item = List.Item;

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
export default class UserSetting extends Component {
    render() {
        const { navigation, dispatch } = this.props;
        const list1 = [
            {
                title: '修改密码',
                path: 'UserChangePassword',
            }, {
                title: '账号关联',
                path: 'UserRelation',
            }
        ]
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "space-between", backgroundColor: "#F8F8F8" }}>
                <View style={PublicStyles.ViewMax}>
                    <List>
                        {
                            list1.map((item, index) => (
                                <Item
                                    key={index}
                                    arrow="horizontal"
                                    onClick={() => {
                                        navigation.navigate(item.path);
                                    }}
                                >
                                    {
                                        item.title
                                    }
                                </Item>
                            ))
                        }
                    </List>
                </View>
                <Button
                    style={{
                        marginBottom: 15,
                        marginHorizontal: 15,
                        borderWidth: 0,
                    }}
                    onClick={() => {
                        dispatch(userLogout());
                    }}
                >
                    <Text style={{ color: '#FB3030' }}>
                        退出账号
                    </Text>
                </Button>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({})
