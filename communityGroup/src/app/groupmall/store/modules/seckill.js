import api from '../../../../config/webapi';
export default {
    state: {

    },
    getters: {},
    actions: {
        /** 
         * @method
         * @description 查询秒杀
         */
        getActivity({},data){
            return api.get('activity/v1/all',data)
        },
        /** 
         * @method
         * @description 查询商品
         */
        getProducts({},data){
            return api.get('activity/v1/goods/can/add',data)
        },
    },
    mutations: {}
}