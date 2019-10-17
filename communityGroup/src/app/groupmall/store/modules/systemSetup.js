import api from '../../../../config/webapi';
import env from '../../../../config/envConfig';
import {Message} from 'iview';
const userInfo = env.get('userInfo');
export default {
    state: {
        systemSetMsg: {}
    },
    getters: {
        systemSetMsg: state => state.systemSetMsg
    },
    actions: {
        /**
         * @method 
         * @description 获取系统设置信息
         */
        async getSystemSetMsg({
            commit,
            state
        }) {
            let res = await api.platHttp({
                url : 'MiniProgramy/mini/system/setting',
                data: {
                    miniProgramyId: userInfo.miniProgramyId
                },
                method: 'get'
            });
            res.data.experiencersTemp = res.data.experienceUser ? res.data.experienceUser.split(',') : [];
            res.data.experiencersTemp = res.data.experiencersTemp.filter(v => {
                return v != ''
            });
            res.data.capacityPercent = Number((Number(res.data.useCapacitySize) / Number(res.data.capacitySize) * 100).toFixed(2));
            state.systemSetMsg       = res.data;
        },
        /**
         * @method
         * @description 重新授权
         */
        async reauth({}) {
            let res = await api.platHttp({
                url : 'rest/openwx/qrcode',
                data: {
                    appmodelId: userInfo.appmodelId,
                    type      : 1
                }
            });
            let aTag      = document.createElement("a");
                aTag.href = res;
            aTag.click();
        },
        /**
         * @method
         * @description 撤销审核
         */
        async cancelAudit({
            state
        }) {
            return api.platHttp({
                url : 'rest/openwx/retractAudit',
                data: {
                    authorizerAppid: state.systemSetMsg.appid
                }
            });
        },
        /**
         * @method
         * @description 更新版本
         */
        updateVersion({
            state
        }, data) {
            return api.platHttp({
                url: 'rest/openwx/upload',
                data,
            });
        },
        /**
         * @method
         * @description 同步基本信息
         */
        async syncBaseMsg({
            state,
            dispatch
        }) {
            let res = await api.platHttp({
                url : 'rest/openwx/refreshAuthorizerInfo',
                data: {
                    appmodelId     : userInfo.appmodelId,
                    authorizerAppid: state.systemSetMsg.appid
                }
            });
            if (res.code == 200) {
                Message.success(res.result)
                dispatch('getSystemSetMsg')
            } else {
                Message.error(res.result)
            }
        },
        /**
         * @method
         * @description 更新商户信息
         */
        updateBusinessMsg({
            state
        }, data) {
            return api.platHttp({
                url: 'manager/v1/updateManager',
                data,
                method: 'put'
            });
        },
        /**
         * @method
         * @description 查看秘钥
         */
        checkSecret({
            state
        }, data) {
            return api.platHttp({
                url: 'MiniProgramy/getMiniSecret',
                data,
                method: 'get'
            });
        },
        /**
         * @method
         * @description 获取验证码
         */
        async getValidCode({
            state
        }) {
            let res=await api.platHttp({
                url : 'UserSms/sendSms',
                data: {
                    userTel: userInfo.userTel
                },
                method: 'get'
            });
            res = JSON.parse(res)
            if (res.code == 100) {
                Message.success(res.result)
              } else {
                Message.error(res.result)
              }
            return Promise.resolve(res)
        },
        /**
         * @method
         * @description 验证手机
         */
        validTel({
            state
        }, data) {
            return api.platHttp({
                url: 'MiniProgramy/getMiniSecret',
                data
            });
        },
        /**
         * @method
         * @description 设置体验者
         */
        setExperience({
            state
        }, data) {
            return api.platHttp({
                url: 'operatMini/Experience',
                data
            });
        },
    },
    mutations: {}
}