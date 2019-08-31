import { env } from '../index';

const ROOT_URL = `${env.apiHost}/server/`;
export const UploadApi = {
    addImage:{
        url: `${ROOT_URL}upload/addImage`,
        method: 'POST'
    }
};
