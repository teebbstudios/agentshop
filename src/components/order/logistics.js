import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";
import { NetworkImage } from "../theme"
// todo 废弃 没用到
export default class OrderLogistics extends Component {
    static propTypes = {
        dataSource: PropTypes.object,
        justifyContent: PropTypes.object,
    };
    static defaultProps = {
        dataSource: null,
        justifyContent: {
            left: 'flex-start',
            right: 'flex-end',
            center: 'center'
        }
    };


    render() {
        const { justifyContent, dataSource } = this.props
        return <View style={styles.logistics}>
            <View
                style={{
                    justifyContent: justifyContent[dataSource.options.align],
                    backgroundColor: dataSource.options.background_color
                }}
            >
                <NetworkImage style={styles.image} source={{ uri: dataSource.options.leading_image.url }} resizeMode="aspectFit" />
                <Text style={
                    { color: dataSource.options.font_color }
                }>{dataSource.options.title}</Text>
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    logistics: {
    },
    image: {
        width: 25,
        height: 25,
        marginRight: 10
    }
})
