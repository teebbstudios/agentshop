import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

export default class BodySeparator extends Component {
    render() {
        const { options } = this.props.data;
        const { color, style } = options
        return <View
            style={[styles.line,{
                borderBottomWidth: 1,
                borderBottomColor: color,
                borderStyle: style,
            }]}
        />
    }
}

const styles = StyleSheet.create({
    line: {
        flex: 1,
        marginVertical: 20,
    }
});
