import { Platform } from 'react-native';
const AppName =  `quwanshop`; // 项目名称
const AppVersion = `1.0.0`; // 项目版本
const AppPlatform = Platform.OS; // 项目平台
const AppStorageName =  `fashop-client`; // 项目存储前缀名称
const errorCollectApi =  `https://app.wujing.name`; // 错误收集接口地址
const mobileWebDomain =  `https://app.wujing.name`; // mobile Web域名
const AppIcon = require('../images/logo.png'); // 项目图标
const AppEnv = __DEV__ ? 'debug' : 'release'; // 项目环境

// 开发环境基础配置
const developmentConfig =  {
    apiHost : 'http://192.168.1.5', // api地址
    // apiHost : 'https://www.seasaltlink.com', // api地址
    // apiHost : 'https://app.wujing.name', // api地址
    log : true, // 是否开启输出日志
    showLog : true, // 是否显示输出日志
    showNetWorkErrorInfo : true, // 是否显示接口错误信息
    defaultUploadNetWorkErrorInfo : false, // 是否静默提交接口错误信息
    dev : __DEV__,
    mockDomain: '', // mock域名
};

// 生产环境基础配置
const productionConfig =  {
    apiHost : 'http://192.168.1.5', // api地址
    // apiHost : 'https://www.seasaltlink.com', // api地址
    // apiHost : 'https://app.wujing.name', // api域名
    log : false, // 是否开启输出日志
    showLog : false, // 是否显示输出日志
    showNetWorkErrorInfo : false, // 是否显示接口错误信息
    defaultUploadNetWorkErrorInfo : true, // 是否静默提交接口错误信息
    dev : __DEV__,
    mockDomain: '', // mock域名
};
console.ignoredYellowBox = ['Warning: isMounted']
// 系统环境配置
const env = (()=>{
    if(__DEV__){                    //开发环境
        return developmentConfig
    }else {                         //生产环境
        return productionConfig
    }
})();

const closeLogger = ()=>{
    global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        error: () => {},
    };
};
const closeShowLogger = ()=>{
    console.disableYellowBox = true;
};

if(!env.showLog){
    closeShowLogger()
}
if(!env.log){
    closeLogger()
}

export {
    AppName,
    AppPlatform,
    AppIcon,
    AppVersion,
    AppEnv,
    AppStorageName,
    errorCollectApi,
    developmentConfig,
    productionConfig,
    env,
    mobileWebDomain,
}
