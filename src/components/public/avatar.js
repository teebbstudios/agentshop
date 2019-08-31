import React, { Component } from 'react';
import PropTypes from 'prop-types';
import{
    StyleSheet,
    View,
    ViewPropTypes,
} from 'react-native';
import { NetworkImage } from '../theme'

export default class PublicAvatar extends Component{
    static propTypes = {
        avatar : PropTypes.string,
        size : PropTypes.number,
        style : ViewPropTypes.style,
        otherStyle : ViewPropTypes.style,
    }
    static defaultProps = {
        avatar : '',
        size: 36,
        style : {
            width: 36,
            height: 36,
            borderRadius: 18,
            overflow: 'hidden'
        },
        otherStyle : {},
    };
    render() {
        const {
            avatar,
            size,
            style,
            otherStyle
        } = this.props
        return (
            <View
                style={[
                    size ? {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        overflow: 'hidden',
                    } : style,
                    otherStyle
                ]}
            >
                <NetworkImage
                    errImg={require('../../images/default-avatar.png')}
                    style={{
                        width: size,
                        height: size,
                    }}
                    source={{uri: avatar}}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({

})
