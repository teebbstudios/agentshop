import React, { Component } from 'react';
import { windowWidth } from '../../utils/style';
import PropTypes from 'prop-types';
import {
    View,
    ImageBackground,
    TouchableOpacity,
    Text,
} from 'react-native';

export default class FetchFailure extends Component {
    static propTypes = {
        height: PropTypes.number,
        autoLayout: PropTypes.bool,
    };
    static defaultProps = {
        height: windowWidth * 0.8,
        autoLayout: false,
    };

    render() {
        const { autoLayout, height, refresh } = this.props
        return (
            <View
                style={
                    Object.assign({}, styles.loaddingView,
                        autoLayout
                            ? {
                                flex: 1
                            }
                            : {
                                height,
                            }
                    )
                }
            >
                <ImageBackground
                    source={require('../../images/fetchStatus/failure.png')}
                    resizeMode={'contain'}
                    style={
                        Object.assign({}, styles.loaddingImage,
                            autoLayout
                                ? {
                                    width: windowWidth * 0.5,
                                }
                                : {
                                    height: height,
                                    width: height,
                                }
                        )
                    }
                >
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => {
                            refresh()
                        }}
                    />
                </ImageBackground>
                <Text style={{ color: '#999' }}>
                    网络走丢了，刷新试试
                </Text>
            </View>
        )
    }
}


const styles = {
    loaddingView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaddingImage: {},
}
