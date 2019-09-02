import React, {Component} from "react";
import {connect} from "react-redux";
import {
    View,
    BackHandler,
    Alert,
} from "react-native";
import Navigator from './navigator';
import NavigationService from "./navigationService";
import {initUserInfoStorage} from "../actions/user";
import {initWechat} from '../actions/app/wechat';
import {getHomeView} from '../actions/home';
import {getAreaList} from '../actions/address';
import {NavigationActions} from 'react-navigation';
import SplashScreen from "react-native-splash-screen";
import {fetchStatus} from "../utils";
import {checkVersionUpdate} from "../actions/app";

class App extends Component {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        const {
            dispatch
        } = this.props;
        dispatch(checkVersionUpdate());
        dispatch(initUserInfoStorage());
        dispatch(initWechat());
        dispatch(getHomeView());
        dispatch(getAreaList({
            params: {level: 2, tree: 1}
        }));
        SplashScreen.hide();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        // const {dispatch, navigation} = this.props;
        // if (navigation.index > 0) {
        //     dispatch(NavigationActions.back());
        //     return true;
        // } else {
        //     Alert.alert(
        //         '退出应用',
        //         '确认退出应用吗?',
        //         [
        //             {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        //             {text: '确认', onPress: () => BackHandler.exitApp()},
        //         ],
        //         {cancelable: false}
        //     );
        //     return true;
        // }
    };

    render() {
        const {cartNum, homeView, homeViewFetchStatus} = this.props;
        if (homeViewFetchStatus !== fetchStatus.s) {
            return null
        }
        return (
            <View style={{flex: 1}}>
                <Navigator
                    screenProps={{
                        cartNum,
                        homeTitle: homeView.name
                    }}
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </View>
        )

    }

}

const mapStateToProps = store => {
    const {
        user: {login, cartNum, userToken},
        initial: {showBootPage},
    } = store.app;
    const {
        home: {homeView, homeViewFetchStatus},
        address: {areaList}
    } = store.view;
    return {
        login,
        cartNum,
        userToken,
        showBootPage,
        areaList,
        homeView,
        homeViewFetchStatus,
    };
};

export default connect(mapStateToProps)(App);
