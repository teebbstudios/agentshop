import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    BackHandler,
    Image
} from 'react-native';
import Video from 'react-native-video';
import { windowWidth, PublicStyles, ThemeStyle } from "../../utils/style";

function formatTime(second) {
    let h = 0, i = 0, s = parseInt(second);
    if (s > 60) {
        i = parseInt(s / 60);
        s = parseInt(s % 60);
    }
    // 补零
    let zero = function (v) {
        return (v >> 0) < 10 ? "0" + v : v;
    };
    // console.log([zero(h), zero(i), zero(s)].join(":"));
    return [zero(h), zero(i), zero(s)].join(":");
    // return zero(s);
}

export default class PageVideo extends Component {
    state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0.0,
        currentTime: 0.0,
        paused: true,
    };
    onLoad = (data) => {
        this.setState({ duration: data.duration });
        // console.log(data.duration + "xxx");
    };
    onProgress = (data) => {
        this.setState({ currentTime: data.currentTime });
        // console.log(data.currentTime + "hhh");
    };
    onEnd = () => {
        console.log("结束了");
        
        this.setState({ paused: true })
        // this.video.seek(0) // 重新开始播放
    };
    onAudioBecomingNoisy = () => {
        this.setState({ paused: true })
    };
    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        this.setState({ paused: !event.hasAudioFocus })
    };
    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };
    renderRateControl(rate) {
        const isSelected = (this.state.rate === rate);
        return (
            <TouchableOpacity onPress={() => {
                this.setState({ rate })
            }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {rate}x
                </Text>
            </TouchableOpacity>
        );
    }
    renderResizeModeControl(resizeMode) {
        const isSelected = (this.state.resizeMode === resizeMode);
        return (
            <TouchableOpacity onPress={() => {
                this.setState({ resizeMode })
            }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }
    renderVolumeControl(volume) {
        const isSelected = (this.state.volume === volume);
        return (
            <TouchableOpacity onPress={() => {
                this.setState({ volume })
            }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {volume * 100}%
                </Text>
            </TouchableOpacity>
        )
    }
    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        const { navigation } = this.props;
        const { data } = this.props.data;
        const {
            rate,
            volume,
            muted,
            resizeMode,
            paused,
            duration,
            currentTime,
        } = this.state
        return (
            <View style={styles.container}>
                <Video
                    ref={ref => this.video = ref}
                    /* For ExoPlayer */
                    source={{ uri: data.url }}
                    style={styles.fullScreen}
                    rate={rate}
                    paused={paused}
                    volume={volume}
                    muted={muted}
                    resizeMode={resizeMode}
                    onLoad={this.onLoad}
                    onProgress={this.onProgress}
                    onEnd={this.onEnd}
                    onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                    onAudioFocusChanged={this.onAudioFocusChanged}
                    repeat={false}
                />
                {
                    paused ? 
                    <TouchableOpacity
                        style={styles.midStopView}
                        onPress={() => {
                            if(formatTime(currentTime)===formatTime(duration)){
                                this.video.seek(0)
                            }
                            this.setState({ paused: !paused })
                        }}
                    >
                        <Image source={require('../../images/video/stop1.png')}/>
                    </TouchableOpacity> : null
                }
                <View style={[PublicStyles.rowBetweenCenter,styles.controls]}>
                    <TouchableOpacity
                        onPress={() => {
                            if(formatTime(currentTime)===formatTime(duration)){
                                this.video.seek(0)
                            }
                            this.setState({ paused: !paused })
                        }}
                        style={{
                            paddingHorizontal: 10
                        }}
                    >
                        {
                            paused ? 
                            <Image source={require('../../images/video/stop2.png')} /> :
                            <Image source={require('../../images/video/play.png')} />
                        }
                    </TouchableOpacity>
                    <Text style={[PublicStyles.boldTitle,styles.timeText,{marginLeft:0}]}>{formatTime(currentTime)}</Text>
                    <View style={styles.progress}>
                        <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
                        <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
                    </View>
                    <Text style={[PublicStyles.boldTitle,styles.timeText]}>{formatTime(duration)}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("FullScreenVideo",{
                                uri: data.url
                            });
                        }}
                    >
                        <Image source={require('../../images/video/full.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        height: windowWidth*0.56,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 10,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 2,
        backgroundColor: ThemeStyle.ThemeColor,
    },
    innerProgressRemaining: {
        height: 2,
        backgroundColor: '#D7D9D9',
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        fontSize: 16,
        color: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: 'white',
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
    midStopView: {
        position: 'absolute',
        left: (windowWidth-44)/2,
        top: (windowWidth*0.56-44)/2,
    },
    timeText: {
        color: '#fff',
        marginLeft: 10,
        marginRight: 15,
        fontSize: 12
    }
});
