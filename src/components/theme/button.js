import React, { Component } from 'react';
import PropTypes from 'prop-types';
import{
    StyleSheet,
    ViewPropTypes,
} from 'react-native';
import { Button } from 'antd-mobile-rn';

export default class ThemeButton extends Component{
    static propTypes = {
        style : ViewPropTypes.style,
        type : PropTypes.string,
        onClick : PropTypes.func,
    }
    static defaultProps = {
        style : {},
        type: 'default',
        onClick: ()=>{},
    }
    render() {
        return(
            <Button
                {...this.props}
                style={[{borderRadius: 3},this.props.style]}
            >
                {this.props.children}
            </Button>
        )
    }
}

const styles = StyleSheet.create({

})
