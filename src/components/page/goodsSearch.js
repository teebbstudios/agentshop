import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import {SearchBar} from "antd-mobile-rn";

export default class PageGoodsSearch extends Component {
    render() {
        const {goGoodsList} = this.props;
        const {options} = this.props.data;
        const {background_color} = options;
        return <TouchableOpacity
            style={[styles.warp, {backgroundColor: background_color}]}
            activeOpacity={.8}
            onPress={goGoodsList}
        >
            <View
                style={[styles.inputView, {borderWidth: (background_color === '#fff' || background_color === '#ffffff') ? 0.5 : 0}]}>
                <Image style={styles.img} source={require('../../images/search.png')}/>
                {/*<TextInput*/}
                {/*    placeholder="搜索商品"*/}
                {/*    style={styles.input}*/}
                {/*    underlineColorAndroid={'transparent'}*/}
                {/*    onFocus={goGoodsList}*/}
                {/*/>*/}
                <View style={{padding: 6}}>
                    <Text style={{color: '#777777'}}>搜索商品</Text>
                </View>
            </View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    warp: {
        padding: 8,
    },
    inputView: {
        backgroundColor: '#fff',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#eaeaea'
    },
    img: {
        marginRight: 10
    },
    // input: {
    //     marginTop:5,
    //     height: 34,
    //     // fontSize: 12,
    //     textAlign: 'center',
    // }
});
