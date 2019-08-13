import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { windowWidth } from '../../utils/style';
import { NetworkImage } from "../theme";

export default class BodyImage extends Component {
    state = {
        imgWidth: windowWidth,
        imgHeight: 0,
    }
    componentDidMount(){
        const { url } = this.props
        // 图片自适应高度
        Image.getSize(url, (width, height) => {
            this.setState({
                imgHeight: Math.floor(windowWidth/width*height)
            })
        })
    }
    render() {
        const { url, navigation } = this.props
        const { imgWidth, imgHeight } = this.state
        return <TouchableOpacity
            activeOpacity={.8}
            onPress={()=>{
                navigation.navigate('PhotoGallery', {
                    images: [{ source: { uri: url } }],
                    index: 0
                })
            }}
        >
            <NetworkImage
                source={{
                    uri: url
                }}
                style={{
                    width: imgWidth,
                    height: imgHeight,
                }}
            />
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({

});
