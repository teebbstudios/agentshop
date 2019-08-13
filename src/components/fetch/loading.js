import React,{ Component } from 'react';
import {windowWidth} from '../../utils/style';
import PropTypes from 'prop-types';
import{
    View,
    Image,
} from 'react-native';


export default class FetchLoading extends Component{
    static propTypes = {
        height : PropTypes.number,
        autoLayout : PropTypes.bool,
    };
    static defaultProps = {
        height : windowWidth*0.4,
        autoLayout : false,
    };
    // componentDidMount() {
    //     this.animation.play();
    // }
    render() {
        const {autoLayout,height} = this.props
        return (
            <View
                style={
                    Object.assign({},styles.loaddingView,
                        autoLayout
                        ?   {
                                flex:1
                            }
                        :   {
                                height,
                            }
                    )
                }
            >
                {
                    <Image
                        source={require('../../images/fetchStatus/loading.gif')}
                        style={
                            Object.assign({},styles.loaddingImage,
                                autoLayout
                                ?   {
                                        width: windowWidth*0.5,
                                    }
                                :   {
                                        height:height*0.5,
                                        width:height*0.5,
                                    }
                            )
                        }
                        resizeMode = {'contain'}
                    />
                }
                {/* <View
                    style={
                        autoLayout
                        ?   {
                                height:windowWidth*0.9,
                                width: windowWidth*0.9,
                            }
                        :   {
                                height:height*1.6,
                                width:height*1.2,
                                marginTop:height*0.4
                            }
                    }
                >
                    <LottieView
                        ref={animation => {
                          this.animation = animation;
                        }}
                        source={require('../../images/fetchStatus/loading.json')}
                        style={
                            Object.assign({},styles.loaddingImage,
                                autoLayout
                                ?   {
                                        height:windowWidth*0.9,
                                        width: windowWidth*0.9,
                                    }
                                :   {
                                        height:height*1.2,
                                        width:height*1.2,
                                    }
                            )
                        }
                        loop={true}
                    />
                </View> */}
            </View>
        )
    }
}


const styles = {
    loaddingView:{
        justifyContent:'center',
        alignItems:'center',
    },
    loaddingImage:{

    },
}
