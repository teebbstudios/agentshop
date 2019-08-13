import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import PropTypes from "prop-types";

export default class CountDown extends Component {
    static propTypes = {
        countdown: PropTypes.number,
        format: PropTypes.string,
        numStyle: PropTypes.string,
        symbolStyle: PropTypes.string
    };
    static defaultProps = {
        countdown: 0,
        format: 'dd天hh时mm分ss秒',
        numStyle: '',
        symbolStyle: ''
    };
    computeTime = 0
    endTimeMs = 0

    /**
     * Initialization
     */
    init() {
        let { countdown, format } = this.props;
        // countdown seconds
        this.computeTime = countdown;
        // time format
        this.format = format;

        const now = Date.now();
        // end timestamp (millisecond)
        this.endTimeMs = now + this.computeTime * 1000;

        this.initCountdown()
    }

    /**
     * timer
     */
    initCountdown() {
        clearInterval(this._timer);

        const now = Date.now();
        // countdown milliseconds
        let computeTimeMs = this.endTimeMs - now;
        // countdown interval
        let timeout = computeTimeMs % 1000 || 0;

        this._timer = setTimeout(() => {
            this.initCountdown();
        }, timeout)

        this.setCountdownTimeItems(computeTimeMs);
    }

    /**
     * set countdown seconds
     * @param  {Number} computeTimeMs - Countdown milliseconds
     */
    setCountdownTimeItems(computeTimeMs) {
        this.computeTime = parseInt(Math.ceil(computeTimeMs / 1000));
        this.emitRunCount(this.computeTime);

        if (this.computeTime <= 0) {
            clearInterval(this._timer);
            this.emitEndCount();
        }

        let timeItems = this.getTimeItems(this.computeTime, this.format);
        this.setState({
            timeItems
        })
    }

    /**
     * get rendering data
     * @param  {Number} computeTime - countdown seconds
     * @param  {String} format - time format
     * @return {Array} rendering data
     */
    getTimeItems(computeTime, format) {
        if (computeTime < 0) {
            computeTime = 0;
        }
        let arr = format.match(/[a-zA-Z]{1,3}/g) || [];
        let symbolArr = format.match(/[\u4e00-\u9fa5]+|[^a-zA-Z]/g) || [];
        let time = this.getTime(computeTime, format);
        return arr.map((item, i) => {
            return {
                num: time[item],
                symbol: symbolArr[i],
            }
        })
    }

    /**
     * get countdown object
     * @param  {Number} leftseconds - countdown seconds
     * @param  {String} format - time format
     * @return {Object} separated countdown seconds width d, h, m, s
     */
    getTime(leftseconds, format) {
        let d = leftseconds;
        let [s, m, h] = [60, 60, 24].map((unit) => {
            let num = d % unit;
            d = Math.floor(d / unit);
            return num;
        })

        if (leftseconds > 86400 && format.indexOf('d') === -1) {
            h += d * 24;
        }

        if (leftseconds > 3600 && format.indexOf('h') === -1) {
            m += h * 60;
        }

        if (leftseconds > 60 && format.indexOf('m') === -1) {
            s += m * 60;
        }

        return {
            dd: this.formatTime(d),
            hh: this.formatTime(h),
            mm: this.formatTime(m),
            ss: this.formatTime(s),
            d,
            h,
            m,
            s
        }
    }

    /**
     * zero padding
     * @param  {Number} val - number
     * @return {Number|String} the number after zero padding
     */
    formatTime(val) {
        return val < 10 ? `0${val}` : val;
    }

    /**
     * timing callback
     */
    emitRunCount() {
        if (this.props.runcount) {
            this.props.runcount({
                computeTime: this.computeTime
            });
        }
    }

    /**
     * end callback
     */
    emitEndCount() {
        if (this.props.endcount) {
            this.props.endcount();
        }
    }

    componentWillMount() {
        const now = Date.now();
        if (this.format && this.endTimeMs) {
            this.computeTime = parseInt((this.endTimeMs - now) / 1000);
            this.initCountdown();
        }
    }

    componentWillUnmount() {
        clearInterval(this._timer);
    }

    render() {
        return <View style={styles.countdown}>
            {timeItems.length > 0 ? timeItems.map(() => <View style={styles.item}>
                <Text style={styles.itemNum}>{item.num}</Text>
                <Text style={styles.itemSymbol}>{item.symbol}</Text>
            </View>) : null}
        </View>
    }
}
const styles = StyleSheet.create({
    countdown: {
    },
    item: {
        alignItems: "center"
    },
    itemNum: {},
    itemSymbol: {}
})
