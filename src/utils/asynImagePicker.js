import SYImagePicker from "react-native-syan-image-picker";
import { Toast } from './function';
import Fetch from './fetch';
import { windowWidth } from "./style";
import { UploadApi } from "../config/api/upload";

/**
 * 默认参数
 */
const defaultOptions = {
    imageCount: 9,          // 最大选择图片数目，默认9
    isCamera: true,         // 是否允许用户在内部拍照，默认true
    isCrop: false,          // 是否允许裁剪，默认false
    cropW: windowWidth*0.6, // 裁剪宽度，默认屏幕宽度60%
    cropH: windowWidth*0.6, // 裁剪高度，默认屏幕宽度60%
    isGif: false,           // 是否允许选择GIF，默认false，暂无回调GIF数据
    showCropCircle: false,  // 是否显示圆形裁剪区域，默认false
    showCropFrame: true,    // 是否显示裁剪区域，默认true
    showCropGrid: false,     // 是否隐藏裁剪区域网格，默认false
    enableBase64: true,     // 是否返回base64编码，默认false
};

export const asynImagePicker = async ({ type, options, getResult }) => {
    try {
        const photos = await SYImagePicker.asyncShowImagePicker({ ...defaultOptions, ...options });
        let images = []
        photos.map(async (item) => {
            const params = {
                image: item.base64,
                type: 'base64'
            }
            // Toast.info('图片上传中，请耐心等待');
            const e = await Fetch.fetch({
                api: UploadApi.addImage,
                params,
            })
            if(e.code===0){
                images.push(e.result.origin.path);
                getResult(images)
            }else{
                getResult(images)
                Toast.warn(e.msg)
            }
        })
    } catch (err) {
        Toast.info(err.message)
    }
}
