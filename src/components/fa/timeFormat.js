import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
} from 'react-native';
import PropTypes from "prop-types";

export default class TimeFormat extends Component {
    static propTypes = {
        value: PropTypes.number,
        format: PropTypes.string,
        style: PropTypes.object
    };
    static defaultProps = {
        value: null,
        format: 'Y-M-D h:m',
    };

    formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    }

    /**
     * 时间戳转化为年 月 日 时 分 秒
     * number: 传入时间戳
     * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 Y/M/D h:m:s
     */
    format(number, format) {
        const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
        let returnArr = [];
        // console.log(number)
        let date = new Date(number * 1000);
        returnArr.push(date.getFullYear());
        returnArr.push(this.formatNumber(date.getMonth() + 1));
        returnArr.push(this.formatNumber(date.getDate()));

        returnArr.push(this.formatNumber(date.getHours()));
        returnArr.push(this.formatNumber(date.getMinutes()));
        returnArr.push(this.formatNumber(date.getSeconds()));
        for (let i in returnArr) {
            format = format.replace(formateArr[i], returnArr[i])
        }
        return format;
    }

    render() {
        const { value, format, style } = this.props;
        const time = this.format(value, format);
        return <Text style={[styles.time, style]}>{time}</Text>
    }
}
const styles = StyleSheet.create({
    time: {}
});
