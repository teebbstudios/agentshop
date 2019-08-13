import { AsyncStorage } from "react-native"

export default class Cache {
    event = [
        'user_info',
        'user_token',
        'cart_id_checked_list',
        'cart_id_remove_checked_list',
        'address_checked_id',
        // 地区
        'area_list_level2',
    ]

    async get($key) {
        try {
            const $value = await AsyncStorage.getItem($key);
            let obj = JSON.parse($value);
            if (typeof obj === 'object' && obj) {
                return obj;
            } else {
                return $value;
            }
        } catch (error) {
            console.warn(error)
            return null
        }
    }

    async set($key, $value) {
        return await AsyncStorage.setItem($key, typeof $value === 'string' ? $value : JSON.stringify($value));
    }
}
