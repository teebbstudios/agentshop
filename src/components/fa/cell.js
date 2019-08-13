import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from "prop-types";
import { List } from 'antd-mobile-rn';
const Item = List.Item
const Brief = Item.Brief

export default class Cell extends Component {
    static propTypes = {
        type: PropTypes.string,
        title: PropTypes.string,
        label: PropTypes.string,
        extra: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ]),
        arrow: PropTypes.string,
        icon: PropTypes.bool,
        url: PropTypes.bool,
        titleStyle:PropTypes.object,
        labelStyle:PropTypes.object
    };
    static defaultProps = {
        type: null,// 左侧标题
        title: null,// 左侧标题
        label: null,// 标题下方的描述信息
        extra: null,// 右侧内容
        arrow: 'empty',// horizontal,up,down,empty，如果是empty则存在对应的dom,但是不显示
        icon: null,
        url: null,
        titleStyle:{},
        labelStyle:{}
    };


    onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        const {
            title,
            label,
            extra,
            arrow,
            icon,
            titleStyle,
            labelStyle
        } = this.props

        return <Item
            onClick={()=>{
                this.onClick()
            }}
            arrow={arrow}
            thumb={icon}
            extra={extra}
            style={titleStyle}
        >
            {title}
            <Brief style={[{fontSize:12},labelStyle]}>{label}</Brief>
        </Item>
    }

}

const styles = StyleSheet.create({

})
