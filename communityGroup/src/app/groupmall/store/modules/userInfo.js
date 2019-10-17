import env from '../../../../config/envConfig';
import api from '../../../../config/webapi';
import Date from '../../../../utils/date';
console.log(api.getUploadUrl())
export default {
    state: {
        userInfo : env.get('userInfo'),
        imgPlat  : env.get('plat'),
        uploadUrl: api.getUploadUrl,
        Date
    },
    getters: {
        userInfo : state => state.userInfo,
        imgPlat  : state => state.imgPlat,
        uploadUrl: state => state.uploadUrl,
        Date     : state => state.Date,
    },
    actions  : {},
    mutations: {}
}