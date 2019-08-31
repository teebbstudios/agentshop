import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    View,
    Animated,
} from 'react-native';
import { windowHeight } from '../../utils/style'

export default class FilterModal extends Component {
    state = {
        modalOpacity: new Animated.Value(0),
        modalHeight: new Animated.Value(0),
    }
    componentWillReceiveProps(nextProps) {
        const { visible, height } = this.props
        if(nextProps.visible!==visible){
            Animated.parallel([
                Animated.timing(
                    this.state.modalOpacity,
                    {
                        toValue: nextProps.visible?1:0,
                        duration: 400,
                    }
                ),
                Animated.timing(
                    this.state.modalHeight,
                    {
                        toValue: nextProps.visible ? windowHeight-300 : 0,
                        duration: 300,
                        delay: 200
                    }
                )
            ]).start()
        }
    }
    render(){
        const { modalOpacity, modalHeight } = this.state;
        const { visible, modalColor='#fff' } = this.props;
        if(!visible){
            return null
        }
        return(
            <Animated.View
                style={[
                    styles.maskView,
                    {
                        opacity: modalOpacity
                    }
                ]}
            >
                <Text
                    style={{flex:1}}
                    onPress={()=>{
                        this.hideModal()
                    }}
                />
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                >
                    <Animated.View
                        style={[styles.content,{
                            height: modalHeight,
                            backgroundColor: modalColor,
                        }]}
                    >
                        {
                            this.props.children
                        }
                    </Animated.View>
                </View>
            </Animated.View>
        )
    }
    hideModal=()=>{
        const {
            hide
        } = this.props;
        Animated.parallel([
            Animated.timing(
                this.state.modalHeight,
                {
                    toValue: 0,
                    duration: 300,
                }
            ),
            Animated.timing(
                this.state.modalOpacity,
                {
                    toValue: 0,
                    duration: 500,
                }
            )
        ]).start(()=>{
            hide()
        })
    }
}

const styles = StyleSheet.create({
    maskView:{
        backgroundColor:'rgba(0,0,0,0.2)',
        position:'absolute',
        top: 0,
        bottom:0,
        left:0,
        right:0,
    },
    content:{
        // backgroundColor:'#fff',
        height: 0,
    },
})
