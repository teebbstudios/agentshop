import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import PropTypes from "prop-types";

export default class OrderCardButton extends Component {
    static propTypes = {
        text: PropTypes.string,
        active: PropTypes.bool,
    };
    static defaultProps = {
        orderId: null,
        text: null,
        active: PropTypes.false,
    };

    onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
    render(){
        const {  text,  active } = this.props
        return <View style={styles.cartBotton} >
        </View>
    }
}
const styles = StyleSheet.create({
    cartBotton:{}
})
