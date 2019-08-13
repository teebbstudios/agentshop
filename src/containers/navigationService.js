// Navigating without the navigation prop
import { NavigationActions } from 'react-navigation';

let _navigator;
let _routers;
let _navigation;

/**
 * 设置顶层路由导航
 * @param navigatorRef
 */
function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

/**
  * 设置当前路由栈和导航对象
  * @param routers
  * @param navigation
  */
function setRouters(routers, navigation) {
    _routers = routers;
    _navigation = navigation;
}

/**
  * 设置当前路由栈和导航对象
  * @param routers
  * @param navigation
  */
function getRouters() {
    return {
        routers: _routers,
        navigation: _navigation,
    }
}

/**
  * 跳转到指定页面
  * @param routeName
  * @param params
  */
function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            type: NavigationActions.NAVIGATE,
            routeName,
            params,
        })
    );
}

function back(key) {
    _navigator.dispatch(
        NavigationActions.back({
            type: NavigationActions.BACK,
            key
        })
    );
}

/**
  * 返回到顶层
  */
function popToTop() {
    _navigator.dispatch(NavigationActions.popToTop())
}

/**
  * 返回第n个页面
  * @param n
  */
function popToN(n) {
    if (n <= 0) {
        return;
    }
    let len = _routers.length;
    if (len < n || n === len - 1) {
        this.popToTop();
        return;
    }
    _navigation.goBack(_routers[len - n].key);

}

/**
  * 返回
  */
function goBack() {
    _navigator.dispatch(NavigationActions.back({ type: NavigationActions.BACK }));
}

/**
 * 返回到任意页面
 * @param routeName
 */
function popToRouter(routeName) {
    if (!routeName) {
        this.goBack();
        return;
    }
    let len = _routers.length;
    for (let i = 0; i < len - 1; i++) {
        let route = _routers[i];
        if (routeName === route.routeName && i !== len - 1) {
            _navigation.goBack(_routers[i + 1].key);
            return;
        }
    }
}

// add other navigation functions that you need and export them

export default {
    setTopLevelNavigator,
    setRouters,
    getRouters,
    navigate,
    back,
    popToRouter,
    goBack,
    popToTop,
    popToN
};




// 使用
// //对应this.props.navigation.navigate(routeName)
// NavigationService.navigate('Page2');

// //对应this.props.navigation.goBack();
// NavigationService.goBack();

// //返回到路由栈顶层
// NavigationService.popToTop();

// //返回到第n层页面
// NavigationService.popToN(n);

// //返回到指定页面(routeName页面必须在当前路由栈中)
// NavigationService.popToRouter(routeName)

// 上面的前三个方法可以直接用，后面两个是用于返回任意页面，需要在路由栈的顶层页面配置一下，代码如下:

// static navigationOptions = {
//     header:({navigation}) =>{
//         let {state:{routes}} = navigation;
//         NavigationService.setRouters(routes, navigation);
//         return null;
//     }
// };

// 上面代码大意是，拿到当前路由的路由栈（一个包含当前路由信息的数组）,有路由数组了，我们就可以为所欲为之为所欲为了。

