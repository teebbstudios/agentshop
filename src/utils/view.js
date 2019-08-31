import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Modal,
    Animated,
    StatusBar,
    Keyboard,
    ScrollView,
    ViewPropTypes,
} from 'react-native';
import {Toast} from './function';
import {windowWidth} from './style';
import Fetch from './fetch';
import {Button} from 'antd-mobile-rn';


/**
 * 轮播分页工具
 */
export class SwiperTab extends Component {
    static propTypes = {
        dataSource: PropTypes.array,
        NavButtonViewStyle: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
        ]),
        paginationStyle: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
        ]),
        page: PropTypes.number,
        ButtonFun: PropTypes.func,
        height: PropTypes.number,
        width: PropTypes.number,
        activeDot: PropTypes.element,
        dot: PropTypes.element,
        style: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
        ]),
    };
    static defaultProps = {
        dataSource: 5,
        NavButtonViewStyle: undefined,
        page: 1,
        ButtonFun: (e) => {
            return (<Text>默认输出{e}</Text>)
        },
        height: 200,
        width: undefined,
        paginationStyle: undefined,
        activeDot: undefined,
        dot: undefined,
        style: undefined,
    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.dataSource,
            NavButtonViewStyle: this.props.NavButtonViewStyle,
            page: this.props.page,
            ButtonFun: this.props.ButtonFun,
            height: this.props.height,
            width: this.props.width,
            paginationStyle: this.props.paginationStyle,
            activeDot: this.props.activeDot,
            dot: this.props.dot,
        };
    }

    render() {
        if (this.props.dataSource.length) {
            return (
                <Swiper
                    style={[{backgroundColor: '#fff'}, this.props.style]}
                    paginationStyle={this.state.paginationStyle}
                    width={this.state.width}
                    showsButtons={false}
                    height={this.state.height}
                    activeDot={this.state.activeDot ? this.state.activeDot : <View style={styles.activeDot}/>}
                    dot={this.state.dot}
                    loop={false}
                    removeClippedSubViews={false}
                >
                    {
                        (() => {
                            var buttonView = [];
                            let yushu = this.props.dataSource.length % this.state.page;
                            let MaxPage = Math.ceil(this.props.dataSource.length / this.state.page);
                            for (var i = 0; i < Math.ceil(this.props.dataSource.length / this.state.page); i++) {
                                buttonView.push(<View style={this.state.NavButtonViewStyle} key={i}>
                                    {
                                        (() => {
                                            var button = [];
                                            var OnePageNum = 0;
                                            if (MaxPage === (i + 1) && yushu !== 0) {
                                                OnePageNum = yushu + (i * this.state.page)
                                            } else {
                                                OnePageNum = (i + 1) * this.state.page
                                            }
                                            for (var j = i * this.state.page; j < OnePageNum; j++) {
                                                let NewJ = j;

                                                button.push(this.state.ButtonFun(this.props.dataSource[NewJ], NewJ))
                                            }
                                            return button;
                                        })()
                                    }
                                </View>)
                            }
                            return buttonView;
                        })()
                    }
                </Swiper>
            )
        } else {
            return null
        }
    }
}


/**
 * 通用Modal层，点击关闭
 */
export class ModalComponent extends Component {
    static propTypes = {
        width: PropTypes.number,
        horizontal: PropTypes.bool,
        animationType: PropTypes.string,
        modalBackgroundColor: PropTypes.string,
    };
    static defaultProps = {
        width: windowWidth,
        horizontal: false,
        animationType: 'fade',
        modalBackgroundColor: 'rgba(0, 0, 0, 0.3)',
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            width: this.props.width,
            horizontal: this.props.horizontal,
        };
    }

    render() {
        return (
            <Modal
                animationType={this.props.animationType}
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => {
                    this._hide()
                }}
            >
                <View
                    style={[{flex: 1}, this.state.horizontal ? {flexDirection: 'row'} : {flexDirection: 'column'}]}>
                    <Text
                        style={[styles.ModalView, {backgroundColor: this.props.modalBackgroundColor}]}
                        onPress={() => {
                            this._hide()
                        }}
                    >
                    </Text>
                    <View
                        style={[styles.ModalMainView, {width: this.state.width}]}
                    >
                        {this.props.children}
                    </View>
                </View>
            </Modal>
        )
    }

    _show() {
        this.setState({
            visible: true,
        })
    }

    _hide() {
        this.setState({
            visible: false,
        })
    }
}

/**
 * 倒计时按钮
 */
export class CountdownButton extends Component {
    static propTypes = {
        getData: PropTypes.func,
        getParams: PropTypes.func,
        text: PropTypes.string,
        api: PropTypes.object,
        style: ViewPropTypes.style,
        textStyle: Text.propTypes.style,
    };
    static defaultProps = {
        getData: () => {
            console.warn('未设置获得数据属性');
        },
        getParams: () => {
            return {}
        },
        text: '获取验证码',
        api: {},
        style: {},
        textStyle: {},
    };

    constructor(props) {
        super(props);
        this.state = {
            onPress: this.props.onPress,
            center: this.props.text,
            wait: 60,
            ready: true,
        };
    }

    intervalFunc() {
        this.timer = window.setInterval(() => {
            if (this.state.wait === 0) {
                window.clearInterval(this.timer)
                this.setState({
                    center: '获取验证码',
                    ready: true,
                    wait: 60,
                });
            } else {
                this.setState({
                    center: '剩余' + (--this.state.wait) + '秒',
                    ready: false,
                });
            }
        }, 1000);
    }

    componentWillUnmount() {
        this.timer && window.clearInterval(this.timer)
    }

    render() {
        const {
            api,
            getParams,
            style,
            textStyle,
        } = this.props;
        return (
            <Button
                disabled={!this.state.ready}
                onClick={async () => {
                    Keyboard.dismiss();

                    const params = getParams();
                    this.setState({
                        ready: false
                    });

                    const e = await Fetch.fetch({
                        api,
                        params,
                    });
                    // console.log(params);
                    // console.log(e);

                    if (e.code === 0) {
                        this.intervalFunc();
                    } else {
                        Toast.warn(e.msg);
                        this.setState({
                            ready: true
                        })
                    }
                    this.verification(e);
                }
                }
                size={'small'}
                style={[{
                    width: 100,
                    height: 30,
                    borderRadius: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                }, style]}
                activeStyle={false}
            >
                <Text
                    style={[{
                        fontSize: 16,
                        color: '#999'
                    }, textStyle]}
                >
                    {
                        this.state.center
                    }
                </Text>
            </Button>
        );
    }

    async verification(e) {
        const {
            getData
        } = this.props
        // const sms = await Fetch.fetch({
        //     api: 'USERSMSLIST',
        // })
        // console.log(sms);
        // if (sms.errcode === 0) {

        // } else {

        // }
        // getData(e)
    }
}


/**
 * 仿京东 弹窗 Modal 层
 */
export class POPModal extends Component {
    static propTypes = {
        title: PropTypes.string,
        text: PropTypes.string,
        confirmButton: PropTypes.object,
        closeButton: PropTypes.object,
        BanClose: PropTypes.bool,
    };
    static defaultProps = {
        title: '未定义标题',
        text: '未定义内容',
        confirmButton: () => {
            alert(`未定义点击事件`)
        },
        closeButton: () => {
            alert(`未定义点击事件`)
        },
        BanClose: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            title: this.props.title,
            text: this.props.text,
            confirmButton: this.props.confirmButton,
            closeButton: this.props.closeButton,
            bounceValue: new Animated.Value(0),
        };
        this._show = this._show.bind(this);
    }

    render() {
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => {
                    this._hide()
                }}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: '#rgba(0,0,0,0.6)',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Animated.View style={{
                        borderRadius: 10,
                        width: windowWidth * 0.8,
                        backgroundColor: '#fff',
                        overflow: 'hidden',
                        transform: [
                            {scale: this.state.bounceValue},
                        ]
                    }}>
                        <View style={{height: 60, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 14, color: '#333'}}>{this.state.title}</Text>
                            <Text style={{fontSize: 12, color: '#333', marginTop: 10}}>{this.state.text}</Text>
                        </View>
                        <View style={{height: 40, flexDirection: 'row', borderTopWidth: 1, borderColor: '#e2e2e2'}}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    backgroundColor: '#fff',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                activeOpacity={1}
                                onPress={
                                    () => {
                                        if (!this.props.BanClose) {
                                            this._hide(this.state.closeButton.fun);
                                        }
                                    }
                                }
                            >
                                <Text style={{fontSize: 12, color: '#333'}}>{this.state.closeButton.text}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    backgroundColor: '#e4393c',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                activeOpacity={1}
                                onPress={
                                    () => {
                                        this._hide(this.state.confirmButton.fun);
                                    }
                                }
                            >
                                <Text style={{fontSize: 12, color: '#fff'}}>{this.state.confirmButton.text}</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        )
    }

    _show() {
        this.setState({
            visible: true,
        }, () => {
            this.state.bounceValue.setValue(0);
            Animated.spring(
                this.state.bounceValue,
                {
                    toValue: 1,
                    friction: 4,
                    tension: 20,
                }
            ).start();
        })
    }

    _hide(func) {
        if (this.props.BanClose) {
            if (func) {
                func()
            }
        } else {
            this.setState({
                visible: false,
            }, () => {
                if (func) {
                    func()
                }
            })
        }
    }
}


/**
 * 状态栏
 */
export class StatusBarComponent extends Component {
    static propTypes = {
        barStyle: PropTypes.string,
    };
    static defaultProps = {
        barStyle: 'default',
    };

    constructor(props) {
        super(props);
        this.state = {
            barStyle: this.props.barStyle
        }
    }

    render() {
        return (
            <StatusBar
                barStyle={this.state.barStyle}
                animated={false}
            />
        )
    }
}


/**
 * listview_empty_View
 */
export class ListEmptyView extends Component {
    static propTypes = {
        uri: PropTypes.number,
        desc: PropTypes.string,
    };
    static defaultProps = {
        uri: require('../images/fetchStatus/emptyOrder.png'),
        desc: '暂时没有相关信息',
    };

    render() {
        const {uri, desc} = this.props
        return (
            <View style={[
                styles.emptyView,
            ]}>
                <Image
                    source={uri}
                    style={styles.emptyImg}
                />
                <Text style={styles.emptyText}>
                    {desc}
                </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    activeDot: {
        backgroundColor: '#333',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    ModalView: {
        flex: 1,
    },
    ModalMainView: {
        // backgroundColor:'#fff',
    },
    ListView: {
        flex: 1,
    },
    emptyView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyImg: {
        width: windowWidth * 0.30,
        height: windowWidth * 0.30,
    },
    emptyText: {
        fontSize: 14,
        fontFamily: 'PingFangSC-Regular',
        color: '#999',
        lineHeight: 28,
        marginBottom: 40
    },
})
