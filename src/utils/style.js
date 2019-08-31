import {
    StyleSheet,
    Platform,
    Dimensions,
} from 'react-native';

export const windowWidth = Dimensions.get('window').width;

export const windowHeight = Dimensions.get('window').height;

export const PublicStylesString = {
    BottomUnderlayColor: '#333',                         //底部按钮按下去的高量颜色
    borderColor: '#f1f1f1',                              //边框颜色
    ListButtonUnderlayColor: '#f7f7f7',                  //列表按钮按下去的高亮颜色
    GrayColor: '#CAC9CF',                                //辅助性文字的浅灰色
    MainColor: '#FF6633',                             //主体颜色，橙色
    ButtonUnderlayColor: '#e55b2d',                    //按钮按下去的高亮颜色
    SearchBarActiveColor: '#D8B494',            //筛选项高亮的颜色
    ButtonActiveColor: '#FEF1ED',            //筛选项按钮高亮的背景颜色
    backgroundColor: '#F8F8F8',                        //主题背景颜色
    ThemeColor: '#ff7b23',                             //主题颜色
}

export const ThemeStyle = {
    ThemeColor: '#FF635C',                        // 主题1
    ThemeColor2: '#FBAF4D',                        // 主题1
    ThemeColor3: '#ff837d',                     // 主题1半透明
    ThemeColor4: '#17A589',                           // Toast 成功的颜色
    PriceColor: '#EB7641',                      // 价格主题
    ThemeSubColor: '#333',                        // 主题次黑
    ThemeBorderColor: '#e3e3e3',
}

export const PublicStyles = StyleSheet.create({
    ViewsOuts: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
    },
    ViewOut: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    ViewOut2: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: "center",
        alignItems: "center",
    },
    ViewHeader: {
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: ThemeStyle.ThemeColor,
        flex: 1,
    },
    NavigationBarHeader: {
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#efefef',
    },
    ViewMax: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    centerTitleStyle: {
        ...Platform.select({
            ios: {
                width: windowWidth,
                alignItems: 'center',
            },
            android: {
                width: windowWidth - 40,
                alignItems: 'center',
                marginLeft: -20,
            },
        }),
    },
    borderColor: {
        borderColor: PublicStylesString.borderColor,
    },
    backgroundColor: {
        backgroundColor: '#F8F8F8',
    },
    boldTitle: {                                     // 适用于加粗标题
        fontSize: 16,
        color: '#333333',
        fontFamily: 'PingFangSC-Medium',
    },
    title: {                                     // 适用于普通标题
        fontSize: 16,
        color: '#333',
        fontFamily: 'PingFangSC-Regular',
    },
    descFour9: {                                     // 普通描述
        fontSize: 14,
        color: '#999',
        fontFamily: 'PingFangSC-Regular'
    },
    descTwo9: {                                     // 普通描述
        fontSize: 12,
        color: '#999',
        fontFamily: 'PingFangSC-Regular'
    },
    descTwo6: {                                     // time 描述
        fontSize: 12,
        color: '#666',
        fontFamily: 'PingFangSC-Regular'
    },
    descTwoc: {                                     // time 描述
        fontSize: 12,
        color: '#ccc',
        fontFamily: 'PingFangSC-Regular'
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowBetweenCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    BottomButton: {
        backgroundColor: '#333',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    BottomText: {
        fontSize: 13,
        color: '#fff',
    },
    DetailListMod: {
        backgroundColor: '#fff',
        marginBottom: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: PublicStylesString.borderColor,
    },
    DetailList: {
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: PublicStylesString.borderColor,
        flexDirection: 'row',
        paddingVertical: 10,
    },
    Star: {
        height: 13,
        width: 13,
        marginRight: 4,
        marginTop: 1
    },
    BottomBuyButton: {                           //用在了立刻抢购按钮
        borderRadius: 3,
        backgroundColor: PublicStylesString.MainColor,
    },
    activeDot: {                                 //全局轮播激活的小圆圈
        backgroundColor: '#333',
        width: 5,
        height: 5,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    dot: {                                       //全局轮播未激活的小圆圈
        backgroundColor: '#fff',
        width: 5,
        height: 5,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    paginationStyle: {                           //全局轮播按钮放置的位置
        bottom: 5,
        justifyContent: 'flex-end',
        right: 10,
    },
    defaultBtn: {
        borderWidth: 0.5,
        borderColor: '#eaeaea',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 44,
    },
    primaryBtn: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 44,
        backgroundColor: ThemeStyle.ThemeColor,
        borderWidth: 0,
    },
    primaryBtn2: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 44,
        backgroundColor: ThemeStyle.ThemeColor,
        borderWidth: 0,
    },
    defaultBtnText: {
        color: '#333',
        fontSize: 16
    },
    primaryBtnText: {
        color: '#fff',
        fontSize: 16
    }
})
