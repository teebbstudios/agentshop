import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import PropTypes from "prop-types";

export default class Rater extends Component {
    static propTypes = {
        size: PropTypes.number,
        num: PropTypes.number,
        value: PropTypes.number,
    };
    static defaultProps = {
        size: 12,
        num: 5,
        value: 3,
    };

    onChange(value) {
        if (this.props.onChange) {
            this.props.onChange({ value });
        }
    }

    render() {
        const { value, num, size } = this.props
        let list = []
        for (let i = 1; i <= num; i++) {
            list.push(i)
        }
        return <View style={styles.raterList}>
            {
                list.map((item, index) => {
                    return <View>
                        {index < value ?
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    this.onChange(index + 1)
                                }}
                            ><Image
                                source={require('../../images/fa/rater/active.png')} style={[styles.image, {
                                width: size,
                                height: size,
                                marginRight: index === list.length ? 0 : 5
                            }]}
                                resizeMode="stretch"

                            /></TouchableOpacity> : null}
                        {index >= value ?
                            <TouchableOpacity
                                key={`_${index}`}
                                onPress={() => {
                                    this.onChange(index + 1)
                                }}
                            ><Image
                                source={require('../../images/fa/rater/default.png')}
                                style={[styles.image, {
                                    width: size,
                                    height: size,
                                    marginRight: index === list.length ? 0 : 5
                                }]}
                                resizeMode="stretch"
                            /></TouchableOpacity> : null}
                    </View>
                })
            }
        </View>
    }
}
const styles = StyleSheet.create({
    raterList: {
        flexDirection: 'row'
    },
    image: {}
})
