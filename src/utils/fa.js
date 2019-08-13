import Code from './code'
import Toast from './toast';
import Cache from './cache';

export default class Fa {
    static code = new Code()
    static toast = new Toast()
    static cache = new Cache()

    /**
     * 检测数组中是否存在某个字符串
     * @param search
     * @param array
     * @returns {boolean}
     */
    static inArray(search, array) {
        for (let i in array) {
            if (array[i] === search) {
                return true;
            }
        }
        return false;
    }

    static remove(arr, item) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== item) {
                result.push(arr[i]);
            }
        }
        return result;
    }

    static getAntAreaList(list) {
        return Array.isArray(list) && list.length> 0 ? list.map((item) => {
            return {
                value: `${item.id}`,
                label: `${item.name}`,
                children: typeof item['_child'] !== 'undefined' && Array.isArray(item._child) && item._child.length > 0 ? item._child.map((sub) => {
                    return {
                        value: `${sub.id}`,
                        label: `${sub.name}`,
                        children: typeof sub['_child'] !== 'undefined' && Array.isArray(sub._child) && sub._child.length > 0 ? sub._child.map((area) => {
                            return {
                                value: `${area.id}`,
                                label: `${area.name}`
                            }
                        }) : []
                    }
                }) : []
            }
        }) : []
    }
}
