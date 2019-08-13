import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { Carousel } from "antd-mobile-rn";
import { windowWidth, ThemeStyle } from '../../utils/style';
import { NetworkImage } from "../theme"

export default class PageImageAds extends Component {
    render() {
        const { handelLink } = this.props;
        const { data, options } = this.props.data
        const { layout_style } = options
        // 显示形式：折叠轮播1、上下平铺2
        if(layout_style === 1){
            return this.carousel(data,handelLink)
        }
        return this.card(data,handelLink);
    }
    carousel(data,handelLink){
        return(
            <Carousel
                autoplay={data.length>1}
                infinite={data.length>1}
                dotActiveStyle={styles.dotActive}
                dotStyle={styles.dot}
            >
                {
                    data.map((item, i) => (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.img}
                            onPress={() => {
                                handelLink(item.link)
                            }}
                            key={i}
                        >
                            <NetworkImage
                                source={{
                                    uri: item.img.url
                                }}
                                style={styles.img}
                            />
                        </TouchableOpacity>
                    ))
                }
            </Carousel>
        )
    }
    card(data,handelLink){
        return(
            <View>
                {
                    data.map((item, i) => (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.img}
                            onPress={() => {
                                handelLink(item.link)
                            }}
                            key={i}
                        >
                            <NetworkImage
                                source={{
                                    uri: item.img.url
                                }}
                                style={styles.img}
                            />
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    img: {
        width: windowWidth,
        height: windowWidth/2
    },
    dotActive:{
        backgroundColor: ThemeStyle.ThemeColor
    },
    dot:{
        marginHorizontal: 6,
        backgroundColor: '#fff',
        height: 7,
        width: 7
    },
});
