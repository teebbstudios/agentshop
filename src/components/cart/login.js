import React, { Component } from 'react';
import { StyleSheet, View, Image,Text } from 'react-native';
import { Button } from 'antd-mobile-rn'

export default class CartEmpty extends Component {
    render() {
        let imgSrc = require('../../images/fetchStatus/unlogin.png')
        const { navigation } = this.props
        return <View style={styles.empty}>
            <Image style={styles.emptyImage} source={imgSrc} />
            <Text style={styles.emptyText}>您还未登录，无法查看购物车</Text>
            <Button
                type="primary"
                size="small"
                style={{
                    width: 90,
                    height: 30,
                    borderRadius: 3
                }}
                onClick={()=>navigation.navigate('UserLogin')}
            >
                <Text style={{fontSize: 14}}>
                    去登录
                </Text>
            </Button>
        </View>
    }
}

const styles = StyleSheet.create({
    empty: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    emptyImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#999999',
        marginVertical: 15,
    }
});
