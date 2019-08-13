import React, { Component } from 'react';
import { StyleSheet,  Image, TouchableWithoutFeedback } from 'react-native';

export default class CartCheckbox extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checked: props.checked || false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.checked !== this.state.checked) {
            this.setState({
                checked: !!nextProps.checked,
            });
        }
    }

    onClick = () => {
        if (this.props.disabled) {
            return;
        }
        const checked = !this.state.checked;
        if (!(typeof this.props.checked === true)) {
            this.setState({
                checked,
            });
        }
        if (this.props.onClick) {
            this.props.onClick(checked);
        }
    }


    render() {
        const checked = this.state.checked;
        let imgSrc;
        imgSrc = checked ? require('../../images/cart/checked.png') : require('../../images/cart/check.png');
        return <TouchableWithoutFeedback onPress={this.onClick}>
            <Image style={[styles.cartCardCheck,this.props.style]} source={imgSrc}  />
        </TouchableWithoutFeedback>
    }
}

const styles = StyleSheet.create({
    cartCardCheck: {
        width: 16,
        height: 16,
    },
});
