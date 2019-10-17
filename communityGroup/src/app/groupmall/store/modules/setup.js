import api from '../../../../config/webapi';
import env from '../../../../config/envConfig';
import {
    Message
} from 'iview';
const userInfo = env.get('userInfo');
export default {
    state: {
        columnState: {},
    },
    getters: {
        columnState: state => state.columnState
    },
    actions: {
        /**
         * @method
         * @description 栏目状态获取
         */
        async getColumnState({
            state
        }) {
            let params = {
                appmodelId: userInfo.appmodelId
            }
            let res = await api.get('ColumnFlag/v1/findByAppmodelId', params)
            if (res.code == 100) {
                state.columnState = res.data
            }
        },
    },
    mutations: {}
}