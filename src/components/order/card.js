import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class OrderCard extends Component {
    static propTypes = {};
    static defaultProps = {};

    render() {
        return <View style={styles.orderCard}>
            {this.props.children}
        </View>
    }
}
const styles = StyleSheet.create({
    orderCard: {
        backgroundColor: "#ffffff",
        marginBottom: 8
    }
})
