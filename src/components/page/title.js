import React, { Component } from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';
import { List } from "antd-mobile-rn";

const Item = List.Item

export default class PageTitle extends Component {
    render() {
        const { options } = this.props.data
        const { title, align, background_color, font_color, leading_image } = options
        // 标题名称：标题名称
        // 对齐方式：左对齐left、居中对齐center、右对齐right
        // 背景颜色：选择颜色
        // 文字颜色：选择颜色
        // 前导图片：选择图片
        return <List>
            <Item arrow="horizontal" thumb={leading_image.url ? leading_image.url : null} style={{backgroundColor: background_color}}>
                <Text
                    style={[styles.title,{
                        // textAlign: align,
                        color: font_color
                    }]}
                >
                    {title}
                </Text>
            </Item>
        </List>
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize: 14
    }
});
