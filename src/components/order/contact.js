import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

export default class OrderContact extends Component {
    static propTypes = {};
    static defaultProps = {};

    render() {
        return <View style={styles.orderContact}>
            <Image style={styles.image} source={require('../../images/order/customer-service.png')}
                   resizeMode="stretch" />
            <Text style={styles.text}>联系客服</Text>
        </View>
    }
}
const styles = StyleSheet.create({
    orderContact: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 0,
    },
    image: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    text: {
        fontSize: 14,
        color: "#666"
    }
})
