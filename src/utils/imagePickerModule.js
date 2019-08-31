import ImagePicker from 'react-native-image-picker'
import {Toast} from './function';
import Fetch from '../utils/fetch'
import {UploadApi} from "../config/api/upload";

var options = {
    title: '选择照片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '从相册中选择',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    maxWidth: 700,
    maxHeight: 700,
};

export const imagePicker = (callback, params = {}) => {
    if (params.type) {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.error) {
                alert('系统异常，请稍后再试')
            } else if (response.didCancel) {
                console.log('User cancelled image picker');
            } else {
                const fileParams = {
                    file: 'data:image/jpeg;base64,' + response.data,
                    type: params.type
                };
                Toast.info('图片上传中，请耐心等待');
                Fetch.fetch({
                    api: UploadApi.addImage,
                    params: fileParams,
                }).then(
                    (e) => {
                        if (e.code === 0) {
                            callback(e);
                        } else {
                            Toast.error(e.msg);
                        }
                    }
                );

                // .then((e)=>{
                // 	callback(e)
                // })
                // .catch((err)=>{
                //     alert('err',err);
                // })
            }
        });
    } else {
        Toast.warn('未设定上传type类型')
    }
}
