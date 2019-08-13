import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { NetworkImage } from "../theme"

export default class PageTopMenu extends Component {
    render() {
        const { handelLink } = this.props;
        const { data, options } = this.props.data;
        const { menu_format, menu_space } = options
        // 菜单格式：纯文字导航1、小图标导航2（小图标导航 V1不包含）
        // 菜单间距：无间距1、有间距2
        return <View style={styles.list}>
            {
                data.map((item,index)=>(
                    <TouchableOpacity
                        key={index}
                        style={[styles.item,{
                            backgroundColor: item.background_color,
                            marginRight: (index!==(data.length-1))&&menu_space===2 ? 4 : 0
                        }]}
                        onPress={() => {
                            handelLink(item.link)
                        }}
                    >
                        {
                            menu_format===2 ?
                            <NetworkImage style={styles.img} source={{uri:item.img.url}}/> : null
                        }
                        <Text style={[styles.title,{color: item.font_color}]}>{item.title}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        height: 54
    },
    item: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: 15,
        height: 15,
        marginBottom: 5
    },
    title: {
        fontSize:14
    },
});
