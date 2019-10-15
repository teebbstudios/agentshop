import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";
import { Toast } from "antd-mobile-rn";
import { PublicStyles } from '../../utils/style';

export default class GoodsStepper extends Component{
    state = {
        value: this.props.defaultValue ? this.props.defaultValue : 1,
    };
    clickSub = () => {
        const { value } = this.state;
        const { onSubClick, onChange } = this.props;
        if (value > 1) {
            this.setState({
                value: value - 1,
            }, () => {
                if (onSubClick) {
                    onSubClick(value - 1);
                }
                if (onChange) {
                    onChange(value - 1);
                }
            })
        } else {
            Toast.info('至少选择一件', 1)
        }
    }
    clickAdd = () => {
        const { value } = this.state;
        const { stock, onAddClick, onChange } = this.props;
        if (value < stock) {
            this.setState({
                value: value + 1,
            }, () => {
                if (onAddClick) {
                    onAddClick(value + 1);
                }
                if (onChange) {
                    onChange(value + 1);
                }
            })
        } else {
            Toast.info('超出库存', 1)
        }
    }
    render() {
        const { value } = this.state;
        const { stock } = this.props;
        return (
            <View style={PublicStyles.rowCenter}>
                <TouchableOpacity
                    style={[styles.imgView,value === 1 ? styles.disabledView : {}]}
                    onPress={this.clickSub}
                    activeOpacity={.8}
                >
                    <Image
                        source={require("../../images/goodsDetail/sub.png")}
                        style={styles.img}
                    />
                </TouchableOpacity>
                <View style={styles.numView}>
                    <Text style={styles.num}>{value}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.imgView, styles.imgView1,value === stock ? styles.disabledView : {}]}
                    onPress={this.clickAdd}
                    activeOpacity={.8}
                >
                    <Image
                        source={require('../../images/goodsDetail/add.png')}
                        style={styles.img}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    stepperView:{
        height: 30,
    },
    numView: {
        minWidth: 40,
        backgroundColor: '#f8f8f8'
    },
    num: {
        lineHeight: 30,
        textAlign: 'center',
        color: '#333'
    },
    imgView:{
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F4F4F4',
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        marginHorizontal: 1
    },
    imgView1:{
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3
    },
    img: {
        width: 20,
        height: 20
    },
    disabledView:{
        backgroundColor: '#F8F8F8',
    },
});
