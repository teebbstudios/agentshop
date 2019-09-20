import React, { Component } from "react";
import { Image, View } from "react-native";
import { ThemeStyle } from "../../utils/style";
import { createBottomTabNavigator } from 'react-navigation';
import Badge from "@react-native-component/react-native-smart-badge";

import Home from '../home';
import Category from "../category";
import Cart from "../cart";
import User from '../user';
import Agent from "../Agent";

class TabBarItem extends Component {
    render() {
        return (
            <Image
                source={this.props.focused ? this.props.selectedImage : this.props.normalImage}
                style={[
                    {
                        width: 22,
                        height: 22
                    }
                ]}
            />
        )
    }
}

class BadgeItem extends Component {
    render() {
        const { screenProps } = this.props;
        const { cartNum } = screenProps;
        return (
            <View style={[{ width: 20, height: 20 }, this.props.style]}>
                <TabBarItem {...this.props} />
                {
                    cartNum ? <Badge
                        textStyle={{ color: '#fff', fontSize: 10, paddingHorizontal: 2 }}
                        style={{ position: 'absolute', right: -20, top: -6 }}
                    >
                        {cartNum}
                    </Badge> : null
                }
            </View>
        )
    }
}

export default createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "首页",
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require("../../images/tab/tab1.png")}
                        selectedImage={require("../../images/tab/tabActive1.png")}
                    />
                ),
            }),
        },
        Category: {
            screen: Category,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '分类',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require("../../images/tab/tab2.png")}
                        selectedImage={require("../../images/tab/tabActive2.png")}
                    />
                ),
            }),
        },
        Cart: {
            screen: Cart,
            navigationOptions: ({ navigation, screenProps }) => ({
                tabBarLabel: "购物车",
                tabBarIcon: ({ focused, tintColor }) => (
                    <BadgeItem
                        screenProps={screenProps}
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require("../../images/tab/tab3.png")}
                        selectedImage={require("../../images/tab/tabActive3.png")}
                    />
                ),
            })
        },
        Agent: {
            screen: Agent,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "代理",
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require("../../images/agent/agent.png")}
                        selectedImage={require("../../images/agent/agentActive.png")}
                    />
                ),
            })
        },
        User: {
            screen: User,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "我的",
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require("../../images/tab/tab4.png")}
                        selectedImage={require("../../images/tab/tabActive4.png")}
                    />
                ),
            })
        }
    },
    {
        initialRouteName: 'Home',
        tabBarPosition: "bottom",
        swipeEnabled: false,
        animationEnabled: false,
        lazy: true,
        tabBarOptions: {
            activeTintColor: ThemeStyle.ThemeColor,
            inactiveTintColor: "#333",
            style: {
                backgroundColor: '#fff',
                borderTopColor: '#eaeaea',
                borderTopWidth: 0.5
            },
            labelStyle: {
                fontSize: 10
            },
        },
    }
);
