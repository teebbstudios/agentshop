import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from "prop-types";
import { Picker } from 'antd-mobile-rn';

const CustomChildren = (props: any) => (
    <TouchableOpacity onPress={props.onClick} style={styles.picker}>
        {props.areaNames ? <Text style={styles.text}>{props.areaNames}</Text> : null}
        {props.placeholder ? <Text style={styles.placeholder}>{props.placeholder}</Text> : null}
    </TouchableOpacity>
);
export default class Area extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        areaNames: PropTypes.string,
        value: PropTypes.array,
        areaList: PropTypes.array,
        columnsNum: PropTypes.number
    };
    static defaultProps = {
        placeholder: '请选择地区',
        areaNames: null,
        value: [`0`, `0`, `0`],
        areaList: null,
        // 省市县显示列数，3-省市县，2-省市，1-省
        columnsNum: 3
    };

    onChange(value) {
        if (this.props.onChange) {
            this.props.onChange({value});
        }
    }

    render() {
        const { value, areaNames, placeholder, areaList,columnsNum } = this.props
        return areaList.length > 0 ? <View style={styles.section}>
            <Picker
                title="选择地区"
                cols={columnsNum}
                onOk={(e) => {
                    this.onChange(e)
                }}
                value={value}
                data={areaList}

            >
                <CustomChildren
                    areaNames={areaNames}
                    placeholder={placeholder}
                />
            </Picker>
        </View> : null
    }
}

const styles = StyleSheet.create({
    section: {},
    picker: {},
    text: {},
    placeholder: {}
})
