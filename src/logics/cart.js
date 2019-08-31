import CartModel from '../models/cart'
export default class Cart {
    cartModel = new CartModel();

    // 判断是否存在
    async exist(goods_sku_id, userToken) {
        return await this.cartModel.exist({
            goods_sku_id: goods_sku_id,
            userToken
        })
    }

    async save(goods_sku_id, quantity, userToken) {
        const exist = await this.exist(goods_sku_id, userToken);
        if (exist === true) {
            return await this.cartModel.edit({
                goods_sku_id: goods_sku_id,
                quantity: quantity,
                userToken
            })
        } else {
            return await this.cartModel.add({
                goods_sku_id: goods_sku_id,
                quantity: quantity,
                userToken
            })
        }
    }

    async delete(goods_sku_ids,userToken) {
        return await this.cartModel.del({
            goods_sku_ids: goods_sku_ids,
            userToken
        })
    }

    /**
     * 换规格
     * @param goods_sku_id
     * @param to_goods_sku_id
     * @param quantity
     * @returns {Promise<boolean>}
     */
    async change(goods_sku_id, to_goods_sku_id, quantity) {
        const save = await this.save(to_goods_sku_id, quantity)
        if (save) {
            if (goods_sku_id !== to_goods_sku_id) {
                return await this.cartModel.del({
                    goods_sku_ids: [goods_sku_id]
                })
            } else {
                return true
            }
        } else {
            return false
        }
    }
}
