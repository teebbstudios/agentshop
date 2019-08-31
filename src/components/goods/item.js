import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View
} from 'react-native';
import {ThemeStyle, windowWidth} from '../../utils/style';
import {NetworkImage} from "../theme";
import Fetch from "../../utils/fetch";
import {GoodsCollectApi} from "../../config/api/goodsCollect";
import {Toast} from "../../utils/function";
import fa from "../../utils/fa";

export default class GoodsItem extends Component {
    render() {
        const {data, index, onPress} = this.props;
        return <TouchableOpacity
            onPress={onPress}
            style={[styles.item, {
                marginLeft: index % 2 === 0 ? 5 : 0,
            }]}
        >
            <NetworkImage style={styles.img} source={{uri: data.img}}/>
            <View style={styles.bot}>
                <Text style={styles.title} numberOfLines={2}>{data.title}</Text>
                <Text style={styles.price}>￥{data.price}</Text>
            </View>
        </TouchableOpacity>
    }

}


const itemWidth = (windowWidth - (5 * 3)) / 2;

const styles = StyleSheet.create({
    item: {
        width: itemWidth,
        marginTop: 5,
        marginRight: 5
    },
    img: {
        width: itemWidth,
        height: itemWidth,
    },
    bot: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    title: {
        marginVertical: 5,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20,
        height: 30
    },
    price: {
        color: ThemeStyle.ThemeColor,
        marginBottom: 10,
    },
});
