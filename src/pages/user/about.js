import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Linking,
} from 'react-native';
import {List} from "antd-mobile-rn";
import {PublicStyles, windowWidth} from '../../utils/style';
import {connect} from "react-redux";
import Badge from "@react-native-component/react-native-smart-badge";
import {BaseComponent} from "../../components/basecomponent";

const Item = List.Item;

@connect(
    ({
         app: {
             initial: {
                 versionUpdateState,
                 versionUpdateData,
                 showVersionUpdate,
             }
         }
     }) => (
        {
            versionUpdateState,
            versionUpdateData,
            showVersionUpdate,
        }
    ))
export default class About extends BaseComponent {
    render() {
        const {versionUpdateState, versionUpdateData, showVersionUpdate, navigation} = this.props;
        return <ScrollView style={PublicStyles.ViewMax}>
            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40}}>
                <Image style={styles.logoImg}
                       source={require('../../images/shop.png')}
                />
                <Text style={{color: 'red', marginTop: 15}}>易巧分销APP商城</Text>
            </View>
            <View style={{marginTop: 10, flexDirection: 'column'}}>
                <Item
                    key='checkVersion'
                    onClick={() => {
                        if (versionUpdateState === 'required') {
                            Linking.openURL(versionUpdateData.updataURL);
                        }
                    }}
                >
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={PublicStyles.title}>版本更新</Text>
                        {showVersionUpdate ?
                            <Badge
                                textStyle={{color: '#fff', fontSize: 10, paddingHorizontal: 2}}
                            >
                                有新版本
                            </Badge> : null}
                    </View>
                </Item>
                <Item
                    key='yinsixieyi'
                    onClick={() => {
                        navigation.navigate('YiSiPage')
                    }}
                >
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={PublicStyles.title}>用户协议及隐私声明</Text>
                    </View>
                </Item>
            </View>
            {/*<View style={styles.fashopCopyright}>*/}
            {/*    <View style={styles.fashopCopyrightBody}>*/}
            {/*        <Text style={styles.fashopCopyrightText}>舍人（上海）网络科技有限公司提供技术支持</Text>*/}
            {/*    </View>*/}
            {/*</View>*/}
        </ScrollView>;
    }

}

const styles = StyleSheet.create({
    logoImg: {
        width: 100,
        height: 100,
    },
    fashopCopyright: {
        bottom: 0,
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fashopCopyrightBody: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15
    },
    fashopCopyrightImg: {
        height: 16,
        width: 50,
        marginRight: 5
    },
    fashopCopyrightText: {
        color: '#cccccc',
        fontSize: 12,
        lineHeight: 12,
    }
});
