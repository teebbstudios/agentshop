import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput, TouchableOpacity
} from 'react-native';
import PropTypes from "prop-types";
import { TextareaItem, Picker, Switch } from 'antd-mobile-rn';
import Area from "./area";
import FieldCell from "./fieldCell";
import { ImageUpload } from '../../components/theme'

export default class Field extends Component {
    static propTypes = {
        title: PropTypes.string,
        desc: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.node,
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        checked: PropTypes.bool,
        inputType: PropTypes.string,
        pickerMode: PropTypes.string,
        placeholder: PropTypes.string,
        rows: PropTypes.number,
        focus: PropTypes.bool,
        mode: PropTypes.string,
        data: PropTypes.array,
        dataKey: PropTypes.string,
        right: PropTypes.bool,
        error: PropTypes.bool,
        maxlength: PropTypes.number,
        areaNames: PropTypes.string,
        areaList: PropTypes.array,
        uploaderMaxNum: PropTypes.number,
        uploaderFiles: PropTypes.array,
        uploaderName: PropTypes.string,
        uploaderUrl: PropTypes.string,
        uploaderButtonText: PropTypes.string,
        uploaderHeader: PropTypes.object,
        uploaderFormData: PropTypes.object,
        uploaderAllowDel: PropTypes.bool
    };
    static defaultProps = {
        title: null,
        desc: null,
        type: 'input',
        disabled: false,
        loading: false,
        checked: false,
        inputType: 'default',
        pickerMode: 'selector',
        placeholder: null,
        focus: false,
        mode: 'normal',
        data: [],
        dataKey: null,
        right: false,
        error: false,
        maxlength: 140,
        rows: 1,
        areaNames: null,
        areaList: [],
        uploaderMaxNum: 1,
        uploaderFiles: [],
        uploaderName: 'image',
        uploaderUrl: null,
        uploaderButtonText: null,
        uploaderHeader: {},
        uploaderFormData: {},
        uploaderAllowDel: false
    };

    handleFieldChange(value) {
        if (this.props.onChange) {
            this.props.onChange({ value });
        }
    }

    handleFieldFocus(value) {
        if (this.props.onFocus) {
            this.props.onFocus({ value });
        }
    }

    handleFieldBlur(value) {
        if (this.props.onBlur) {
            this.props.onBlur({ value });
        }
    }


    render() {
        const {
            title,
            desc,
            type,
            disabled,
            loading,
            checked,
            inputType,
            pickerMode,
            placeholder,
            value,
            focus,
            mode,
            data,
            dataKey,
            right,
            error,
            maxlength,
            rows,
            areaNames,
            areaList,
            uploaderMaxNum,
            uploaderButtonText,
            uploaderHeader,
            uploaderFormData,
            uploaderAllowDel
        } = this.props
        return <View>
            {type === 'uploader' ?
                <FieldCell title={title} desc={desc}>
                    <ImageUpload
                        maxNum={uploaderMaxNum}
                        defaultValue={value ? value : []}
                        onChange={({ images }) => {
                            this.handleFieldChange(images)
                        }}
                    />
                </FieldCell>
                : null}

            {type === 'textarea' ?
                <FieldCell title={title} desc={desc}>
                    <TextareaItem
                        rows={rows}
                        disabled={disabled}
                        focus={focus}
                        value={value}
                        placeholder={placeholder}
                        count={maxlength}
                        onChange={(value) => {
                            this.handleFieldChange(value)
                        }}
                        onFocus={(value) => {
                            this.handleFieldFocus(value)
                        }}
                        onBlur={(value) => {
                            this.handleFieldBlur(value)
                        }}
                    />
                </FieldCell>
                : null}

            {type === 'input' ?
                <FieldCell
                    title={title}
                    desc={desc}
                    right={
                        <TextInput
                            keyboardType={inputType}
                            editable={!disabled}
                            autoFocus={focus}
                            value={`${value}`}
                            placeholder={placeholder}
                            maxLength={maxlength}
                            onChangeText={(value) => {
                                this.handleFieldChange(value)
                            }}
                            onFocus={(value) => {
                                this.handleFieldFocus(value)
                            }}
                            onBlur={(value) => {
                                this.handleFieldBlur(value)
                            }}
                        />
                    }
                /> : null}

            {type === 'picker' ?
                <FieldCell
                    title={title}
                    desc={desc}
                    right={
                        <Picker
                            cols={1}
                            onChange={(value) => {
                                this.handleFieldChange(value)
                            }}
                            value={value}
                            data={data}>
                            <PickerChildren text={value || value === 0 ? value : placeholder}/>
                        </Picker>
                    }
                /> : null}

            {type === 'area' ?
                <FieldCell
                    title={title}
                    desc={desc}
                    right={
                        Array.isArray(areaList) && areaList.length > 0 ?
                            <Area
                                areaNames={areaNames}
                                placeholder={placeholder}
                                areaList={areaList}
                                value={value}
                                onChange={({ value }) => {
                                    this.handleFieldChange(value)
                                }}
                                onFocus={({ value }) => {
                                    this.handleFieldFocus(value)
                                }}
                                onBlur={({ value }) => {
                                    this.handleFieldBlur(value)
                                }}
                            /> : <View />
                    }
                /> : null}

            {type === 'switch' ?
                <FieldCell
                    title={title}
                    desc={desc}
                    right={
                        <Switch
                            trackColor={{ false: '#4dd865', true: '#4dd865' }}
                            checked={checked}
                            disabled={disabled}
                            onChange={(value) => {
                                this.handleFieldChange(value)
                            }}
                        />
                    }
                />
                : null}
        </View>
    }
}
const styles = StyleSheet.create({})
const PickerChildren = (props: any) => (
    <TouchableOpacity onPress={props.onClick} style={styles.picker}>
        <Text style={styles.picker}>
            {props.text}
        </Text>
    </TouchableOpacity>
);
