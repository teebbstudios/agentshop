import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { windowWidth } from '../../utils/style';
import { NetworkImage } from "../theme"

export default class PageImageNav extends Component {
    render() {
        const { handelLink } = this.props
        const { data, options } = this.props.data
        const { rows, each_row_display } = options;
        // 行数：1行、2行、3行、4行
        // 每行数：1个、2个、3个、4个、5个
        return <View style={styles.list}>
            {
                data.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.item, {
                            width: windowWidth/each_row_display
                        }]}
                        onPress={() => {
                            handelLink(item.link)
                        }}
                    >
                        <NetworkImage
                            style={styles.img}
                            source={{ uri: item.img.url }}
                        />
                        <Text style={styles.title}>
                            {
                                item.title
                            }
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fff',
        marginVertical: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        width: windowWidth / 4.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 35,
        height: 35,
        marginBottom: 10,
    },
    title: {
        color: '#333',
        fontSize: 12,
        fontFamily: 'PingFangSC-Regular',
    },
});

// import React, { Component } from 'react';
// import {
//     StyleSheet,
//     View,
//     ScrollView,
//     Text,
//     TouchableOpacity,
//     Image
// } from 'react-native';
// import { windowWidth } from '../../utils/style';

// export default class Index extends Component {
//     render() {
//         const { data, options } = this.props.data
//         const { rows, each_row_display } = options;
//         // 行数：1行、2行、3行、4行
//         // 每行数：1个、2个、3个、4个、5个
//         return <ScrollView
//             horizontal={true}   // 水平方向
//             scrollEnabled={data.length > 4}
//             showsHorizontalScrollIndicator={false}  // 隐藏水平指示器
//             showsVerticalScrollIndicator={false}    // 隐藏垂直指示器
//             style={{ backgroundColor: '#fff', marginVertical: 10 }}
//         >
//             {
//                 data.map((item, index) => (
//                     <TouchableOpacity
//                         key={index}
//                         style={[styles.item, {
//                             width: each_row_display>4 ? windowWidth/4.5 : windowWidth/data.length
//                         }]}
//                         onPress={() => {
//                             navigation.navigate('Goods', {
//                                 category_id: item.id,
//                                 title: item.title
//                             })
//                         }}
//                     >
//                         <Image
//                             style={styles.img}
//                             source={{ uri: item.img.url }}
//                         />
//                         <Text style={styles.title}>
//                             {
//                                 item.title
//                             }
//                         </Text>
//                     </TouchableOpacity>
//                 ))
//             }
//         </ScrollView>
//     }
// }

// const styles = StyleSheet.create({
//     item: {
//         backgroundColor: '#fff',
//         paddingVertical: 15,
//         width: windowWidth / 4.5,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     img: {
//         width: 35,
//         height: 35,
//         marginBottom: 10,
//     },
//     title: {
//         color: '#333',
//         fontSize: 12,
//         fontFamily: 'PingFangSC-Regular',
//     },
// });
