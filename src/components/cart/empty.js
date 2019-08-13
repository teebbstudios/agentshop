import React, { Component } from 'react';
import { StyleSheet, View, Image,Text } from 'react-native';
export default class CartEmpty extends Component {
    render() {
        let imgSrc = require('../../images/cart/empty.png')
        return <View style={styles.empty}>
            <Image style={styles.emptyImage} source={imgSrc} />
            <Text style={styles.emptyText}>未加入商品，再逛逛吧</Text>
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
        width: 122,
        height: 122,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#999999',
    }

});
