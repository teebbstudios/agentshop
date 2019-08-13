import React, { Component } from 'react';
import {
    View,
} from 'react-native';

export default class PageAuxiliaryBlank extends Component {
    render() {
        const { options } = this.props.data
        const { height } = options
        return <View style={{height}}/>
    }
}
