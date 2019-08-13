import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import PropTypes from "prop-types";
import { Steps } from 'antd-mobile-rn';
import Time from "../../utils/time"
const Step = Steps.Step
export default class RefundStateSteps extends Component {
    static propTypes = {
        refundInfo: PropTypes.object,
        steps: PropTypes.array,
    };
    static defaultProps = {
        refundInfo: null,
        steps: [],
    };


    render() {
        const { refundInfo } = this.props
        const steps = [
            {
                done: true,
                text: '买家退款',
                desc: Time.format('Y/M/D h:m', refundInfo.create_time)
            },
            {
                done: true,
                text: '商家受理',
                desc: Time.format('Y/M/D h:m', refundInfo.handle_time)
            },
            {
                done: true,
                text: '退款成功',
                desc: Time.format('Y/M/D h:m', refundInfo.handle_time)
            }
        ]
        return <View style={styles.refundSteps}>
            <Steps current={2} size={'small'}>
                {steps.map((item: any, index: any) => (
                    <Step
                        key={index}
                        title={item.text}
                        description={item.desc}
                        status={item.done}
                    />
                ))}
            </Steps>
        </View>
    }
}
const styles = StyleSheet.create({
    refundSteps: {
        height:3*60
    }
})
