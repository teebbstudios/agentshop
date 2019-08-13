import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from "prop-types";

export default class OrderButton extends Component {
    static propTypes = {
        size: PropTypes.string,
        text: PropTypes.string,
        type: PropTypes.string,
        active: PropTypes.bool,
    }
    static defaultProps = {
        size: null,
        text: null,
        type: null,
        active: false,
    }

    onClick(e) {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        const { size, text, type, active } = this.props
        return <TouchableOpacity style={[styles.orderButton]} onPress={()=>{                 this.onClick()             }}><Text>{text}</Text></TouchableOpacity>
    }
}
const styles = StyleSheet.create({
    orderButton: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#cccccc",
        textAlign: "center",
        fontSize: 14,
        borderRadius: 3,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginLeft: 10,
    },
    active: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ff4400',
        color: "#ff4400"
    },
    small: {
        paddingVertical: 2,
        paddingHorizontal: 10,
        fontSize: 12
    },
    danger: {
        backgroundColor: "#ff4400",
        color: "#ffffff",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#ff4400",
    }
})
