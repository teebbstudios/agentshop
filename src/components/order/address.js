import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";

export default class OrderAddress extends Component {
    static propTypes = {
        name: PropTypes.string,
        phone: PropTypes.string,
        address: PropTypes.string,
    };
    static defaultProps = {
        name: null,
        phone: null,
        address: null,
    };

    render() {
        const { name, phone, address } = this.props

        return <View style={styles.orderAddress}>
            <View style={styles.info}>
                <View style={styles.user}>
                    <Image style={styles.image} source={require('../../images/order/buyer-address.png')} resizeMode="stretch" />
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.phone}>{phone}</Text>
                </View>
                <View style={styles.address}>
                    <Text>地址：{address}</Text>
                </View>
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    orderAddress: {
        padding: 15,
        backgroundColor:'#FFFFFF'
    },
    image: {
        width: 15,
        height: 15,
        marginRight: 10
    },
    info: {},
    user: {
        alignItems: "center",
        marginBottom: 10,
        flexDirection: 'row',
    },
    name: {
        fontSize: 14,
        marginRight: 10,
        fontWeight: '800'
    },
    phone: {
        fontSize: 14,
        marginRight: 15,
        fontWeight: '800'
    },
    address: {
        fontSize: 14,
        color: "#999999",
        marginLeft: 25
    }
})
