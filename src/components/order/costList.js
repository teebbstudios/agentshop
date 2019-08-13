import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import PropTypes from "prop-types";

export default class OrderCostList extends Component {
    static propTypes = {
        goodsTotal: PropTypes.string,
        freight: PropTypes.string,
        totalCost: PropTypes.any,
    };
    static defaultProps = {
        goodsTotal: null,
        freight: null,
        totalCost: null,
    };

    render() {
        const {
            goodsTotal,
            freight,
            totalCost
        } = this.props
        return <View style={styles.orderCostList}>
            <View style={styles.item}>
                <View style={styles.row}>
                    <Text style={styles.label}>商品总额：</Text>
                    <Text style={styles.text}>¥{goodsTotal}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>运费：</Text>
                    <Text style={styles.text}>¥{freight}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerLabel}>实付款：</Text>
                <Text style={styles.footerText}>¥{totalCost}</Text>
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    orderCostList: {
        backgroundColor: "#fff",
        paddingVertical: 15
    },
    item: {},
    row: {
        justifyContent: "space-between",
        marginBottom: 10,
        paddingVertical: 0,
        paddingHorizontal: 15,
        flexDirection: 'row'
    },
    label: {
        fontSize: 14,
        fontWeight: "400"
    },
    text: {
        fontSize: 12,
        fontWeight: "800"
    },
    footer: {
        paddingTop: 10,
        paddingRight: 15,
        paddingLeft: 15,
        borderTopWidth: 1,
        borderStyle: "solid",
        borderTopColor: "#F8F8F8",
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    footerLabel: {
        fontSize: 12
    },
    footerText: {
        fontSize: 14,
        fontWeight: "800",
        color: "#ff4400"
    }
})
