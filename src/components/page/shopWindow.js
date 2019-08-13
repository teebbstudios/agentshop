import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { windowWidth } from '../../utils/style';
import { NetworkImage } from "../theme"

export default class PageShopWindow extends Component {
    render() {
        const { data, options } = this.props.data
        const { layout_style } = options
        // 展现形式：2列，一大两小------1   3列三小图-------2
        // 设置图片：一大两小模式，左侧大图建议比例284 x 592px，小图300 x 300px
        return <View>
            {
                layout_style===1 ? this.oneBigTwoSmall(data) : this.small(data)
            }
        </View>
    }
    oneBigTwoSmall(data){
        return(
            <View style={styles.bigList}>
                {
                    this.publicImage({ link: data[0].link, img: data[0].img, style: styles.bigImg, index: 0 })
                }
                <View>
                    {
                        this.publicImage({ link: data[1].link, img: data[1].img, style: styles.smallImg1, index: 1 })
                    }
                    {
                        this.publicImage({ link: data[2].link, img: data[2].img, style: styles.smallImg1, index: 2 })
                    }
                </View>
            </View>
        )
    }
    small(data){
        return(
            <View style={styles.smallList}>
                {
                    data.map((item, index) => this.publicImage({ link: item.link, img: item.img, style: styles.smallImg2, index }))
                }
            </View>
        )
    }
    publicImage({ link, img, style, index }){
        const { handelLink } = this.props;
        return(
            <TouchableOpacity
                key={index}
                activeOpacity={.8}
                onPress={() => {
                    handelLink(link)
                }}
            >
                <NetworkImage style={style} source={{ uri: img.url }} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    bigList :{
        flexDirection: 'row',
    },
    smallList :{
        flexDirection: 'row',
    },
    bigImg: {
        width: windowWidth/2,
        height: (windowWidth/2/3)*4,
    },
    smallImg1: {
        width: windowWidth/2,
        height: ((windowWidth/2/3)*4)/2,
    },
    smallImg2: {
        width: windowWidth/3,
        height: windowWidth/3,
    },
});
