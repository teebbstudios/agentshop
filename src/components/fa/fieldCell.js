import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import PropTypes from "prop-types";

export default class FieldCell extends Component {
    static propTypes = {
        title: PropTypes.string,
        desc: PropTypes.string,
        right: PropTypes.element,
    };
    static defaultProps = {
        title: null,
        desc: null,
        right: null,
    };

    render() {
        const { title, desc, right, children } = this.props
        return <View style={styles.cell}>
            {title || desc || right ?
                <View style={[styles.item,{backgroundColor:'#fff'}]}>
                    {
                        title || desc ?
                            <View style={styles.left}>
                                <Text style={{color:'#666'}}>
                                    {title}
                                </Text>
                                {desc?<Text style={styles.desc}>{desc}</Text>:null}
                            </View>
                            : null
                    }
                    {right ?
                        <View style={styles.right}>
                            {right}
                        </View>
                        : null}
                </View>
                : null}
            {
                children ?
                    <View>
                        {children}
                    </View>
                    : null
            }

        </View>
    }
}
const styles = StyleSheet.create({
    cell: {
        borderBottomColor:'#f8f8f8',
        borderBottomWidth: 1,
        borderStyle:'solid',
        paddingVertical: 15,
        paddingHorizontal:15,
    },
    item: {
        alignItems: "center",
        flexDirection: 'row',

    },
    left:{
        width:120
    },
    right:{
        flex:1,
    },
    desc:{
        fontSize:10,
        color:'#999',
        marginTop: 5
    },
    itemNum: {},
    itemSymbol: {}
})
