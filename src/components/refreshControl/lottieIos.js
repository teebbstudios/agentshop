import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import MJRefresh from 'react-native-mjrefresh';
import LottieView from 'lottie-react-native'

export default class LottieRefreshControl extends Component {
    state = {
        scale: new Animated.Value(0.1),
        refreshing: false
    }
    _onRefresh = () => {
        // console.log('正在刷新')
        let { onRefresh } = this.props;
        onRefresh && onRefresh();
        this.lottieView.play(this.state.scale.__getValue())
        this.setState({
            refreshing: true,
        })
    }
    _onPulling = (event) => {
        // console.log('下拉刷新')
        let { percent } = event.nativeEvent;
        if (percent <= 1) {
            this.state.scale.setValue(event.nativeEvent.percent);
        }
        if (percent == 0) {
            this.setState({
                refreshing: false
            })
        }
    }
    finishRefresh = () => {
        this._mjrefresh && this._mjrefresh.finishRefresh();
        this.lottieView.reset();
    }
    beginRefresh = () => {
        this._mjrefresh && this._mjrefresh.beginRefresh();
    }
    render() {
        const { lottieSource } = this.props
        return (
            <MJRefresh
                ref={ref => this._mjrefresh = ref}
                onRefresh={this._onRefresh}
                onPulling={this._onPulling}
                onReleaseToRefresh={() => {
                    // console.log('释放刷新');
                }}
            >
                <View style={{
                    height: 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {
                        this.state.refreshing ?
                            <Refreshing /> :
                            <Animated.View
                                style={{
                                    height: 60,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    transform: [{
                                        scale: this.state.scale.interpolate({
                                            inputRange: [0, 1, 2],
                                            outputRange: [0.1, 1, 1],
                                        })
                                    }]
                                }}
                            >
                                <LottieView
                                    speed={2}
                                    ref={ref => this.lottieView = ref}
                                    style={{ width: 40, height: 40 }}
                                    hardwareAccelerationAndroid
                                    progress={this.state.scale}
                                    source={require('../../images/animates/fashop_pulling.json')}
                                />
                            </Animated.View>
                    }
                </View>
            </MJRefresh>
        )
    }
}

class Refreshing extends React.Component {
    componentDidMount() {
        this.animation.play();
    }
    render() {
        return (
            <LottieView
                ref={ref => this.animation = ref}
                source={require('../../images/animates/fashop_refreshing.json')}
            />
        );
    }
}


// V1
// import React, { Component } from 'react';
// import { View, Animated } from 'react-native';
// import MJRefresh from 'react-native-mjrefresh';
// import LottieView from 'lottie-react-native'

// export default class LottieRefreshControl extends Component {
//     state = {
//         scale: new Animated.Value(0.1)
//     }
//     _onRefresh = () => {
//         let { onRefresh } = this.props;
//         onRefresh && onRefresh();
//         this.lottieView.play(this.state.scale.__getValue())
//     }
//     _onPulling = (event) => {
//         let { percent } = event.nativeEvent;
//         if (percent <= 1) {
//             this.state.scale.setValue(event.nativeEvent.percent);
//         }
//     }
//     finishRefresh = () => {
//         this._mjrefresh && this._mjrefresh.finishRefresh();
//         this.lottieView.reset();
//     }
//     beginRefresh = () => {
//         this._mjrefresh && this._mjrefresh.beginRefresh();
//     }
//     render() {
//         const { lottieSource } = this.props
//         return (
//             <MJRefresh
//                 ref={ref => this._mjrefresh = ref}
//                 onRefresh={this._onRefresh}
//                 onPulling={this._onPulling}
//             >
//                 <View style={{
//                     height: 80,
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}>
//                     <Animated.View style={{
//                         height: 80, justifyContent: 'center', alignItems: 'center', transform: [{
//                             scale: this.state.scale.interpolate({
//                                 inputRange: [0, 1, 2],
//                                 outputRange: [0.1, 1, 1],
//                             })
//                         }]
//                     }}>
//                         <LottieView 
//                             speed={2} 
//                             ref={obj => this.lottieView = obj} 
//                             style={{ width: 40, height: 40 }} 
//                             hardwareAccelerationAndroid 
//                             progress={this.state.scale} 
//                             source={lottieSource ? lottieSource : require('../../images/animates/fashop_refreshing.json')} 
//                         />
//                     </Animated.View>
//                 </View>
//             </MJRefresh>
//         )
//     }
// }