import React from "react";
import {
    Linking,
} from "react-native";
import RootSiblings from "react-native-root-siblings";
import DropdownAlert from "react-native-dropdownalert";
import { ThemeStyle } from './style';
import moment from "moment";
// import RNFS from "react-native-fs";
export const getPickerText = (list, values) => {
    const one = list.find((e) => e.value === values[0])
    const two = one.children.find((e) => e.value === values[1])
    const three = two.children.find((e) => e.value === values[2])
    return `${one.label},${two.label},${three.label}`
}

export const getPickerValue = (list, values) => {
    const one = list.find((e) => e.label === values[0])
    const two = one.children.find((e) => e.label === values[1])
    const three = two.children.find((e) => e.label === values[2])
    return [one.value,two.value,three.value]
}

export const timeBefore = time => {
    let result = '';
    const timeFormat = moment(time, "X").format("YYYY-MM-DD HH:mm:ss");
    let difMinutes = moment(timeFormat).diff(moment(), 'minutes')
    let difHours = moment(timeFormat).diff(moment(), 'hours')
    let difDays = moment(timeFormat).diff(moment(), 'days')
    if (difMinutes === 0) {
        result = '刚刚'
    } else if ((-difMinutes) < 60) {
        result = `${-difMinutes}分钟前`
    } else if ((-difMinutes) === 60) {
        result = `1小时前`
    } else if ((-difHours) < 24) {
        result = `${-difHours}小时前`
    } else if ((-difHours) === 24) {
        result = `1天前`
    } else if ((-difDays) < 3) {
        result = `${-difDays}天前`
    } else {
        result = moment(time, "X").format("YYYY-MM-DD")
    }

    return result;
};

// /**
//  * 保存图片到相册
//  * @param ImageUrl  图片地址
//  * @returns {*}
//  */
// export const downloadLocalImage = (ImageUrl) => {
//     if (!ImageUrl) return null;
//     return new Promise((resolve, reject) => {
//         try {
//             CameraRoll.saveToCameraRoll(ImageUrl)
//             .then((result) => {
//                 resolve({ statusCode: 200 });
//                 alert('保存成功！地址如下：\n' + result);
//             })
//             .catch((error) => {
//                 alert('保存失败！\n' + error);
//             });
//         } catch (e) {
//             reject(new Error(e))
//         }

//     })
// }

// /**
//  * 下载网页图片
//  * @param uri  图片地址
//  * @returns {*}
//  */
// export const downloadImage = (saveImageUrl) => {
//     const storeLocation = `${RNFS.DocumentDirectoryPath}`;
//     let pathName = new Date().getTime() + "qrcode.png"
//     let downloadDest = `${storeLocation}/${pathName}`;
//     const ret = RNFS.downloadFile({ fromUrl: saveImageUrl, toFile: downloadDest });
//     ret.promise.then(res => {
//         if (res && res.statusCode === 200) {
//             downloadLocalImage("file://" + downloadDest);
//         }
//     })
// }

export const removeEmpty = value => {
  for (var key in value) {
    if (
      (String(value[key]) === "[object Object]" &&
        !Object.keys(value[key]).length) ||
      String(value[key]) === "[]" ||
      String(value[key]) === "null" ||
      String(value[key]) === "undefined" ||
      String(value[key]) === ""
    ) {
      delete value[key];
    }
  }
  return value;
};


export class Toast {
    static info(e) {
        Toast.DropdownAlert("info", "提示", e);
    }
    static warn(e) {
        Toast.DropdownAlert("warn", "提醒", e);
    }
    static success(e) {
        Toast.DropdownAlert("success", "成功", e);
    }
    static error(e) {
        Toast.DropdownAlert("error", "错误", e);
    }
    static DropdownAlert(type, title, text) {
        const textString = String(text);
        let sibling = new RootSiblings(
            (
                <DropdownAlert
                    ref={ref => {
                        ref&&ref.alertWithType(type, title, textString);
                    }}
                    infoColor={ThemeStyle.ThemeColor}
                    successColor={ThemeStyle.ThemeColor4}
                    closeInterval = {3000}
                />
            )
        );
    }
}

export class LinkingFunc {
    static openTel(e) {
        let url = `tel:${e}`
        Linking.canOpenURL(url)
        .then(supported => {
            if (!supported) {
                Toast.info('不能拨打电话!', 1)
            } else {
                return Linking.openURL(url);
            }
        })
        .catch(err => console.error('An error occurred', err))
    }
}

// 方法定义 lat,lng
export const getDistance = ( lat1,  lng1,  lat2,  lng2) => {
    let radLat1 = lat1*Math.PI / 180.0;
    let radLat2 = lat2*Math.PI / 180.0;
    let a = radLat1 - radLat2;
    let b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
}
// 调用 return 的距离单位为km
// GetDistance(10.0,113.0,12.0,114.0)


// 楼盘自定义数据
export const estateListByArea = ({ areaList, newData, oldData }) => {
    if (!areaList.length) {
        return null;
    }
    let result = oldData
    newData.map((item, index) => {
        let resultIndex = result.findIndex((ritem, index) => {
            return ritem.area_id === item.area_id
        })
        let areaIndex = areaList[0].child.findIndex((aitem, index) => {
            return aitem.id === item.area_id
        })
        if (resultIndex === -1) {
            result.push({
                area_id: item.area_id,
                area_name: areaList[0].child[areaIndex].name,
                list: [{
                    id: item.id,
                    title: item.title
                }]
            })
        } else {
            result[resultIndex].list.push({
                id: item.id,
                title: item.title
            })
        }
    })
    return result;
}
