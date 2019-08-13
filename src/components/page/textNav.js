import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import { List } from "antd-mobile-rn";

const Item = List.Item

export default class PageTextNav extends Component {
    render() {
        const { handelLink } = this.props
        const { data } = this.props.data
        return <List>
            {
                data.map((item,index)=>(
                    <Item 
                        key={index} 
                        arrow="horizontal"
                        onClick={() => {
                            handelLink(item.link)
                        }}
                    >
                        {item.title}
                    </Item>
                ))
            }
        </List>
    }
}

const styles = StyleSheet.create({

});
