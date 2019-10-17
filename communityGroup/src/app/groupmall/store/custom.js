import api from '../../../config/webapi';
export default {
  state: {
  },
  actions: {
    saveCustom({ commit }, param = {}) {
      return api.put("provider/v1/apply", param);
    },
    getCustom({ commit }, param = {}) {
      return api.get("provider/v1/manager", param);
    },
    deleteCustom({ commit }, param = {}) {
      return api.put("provider/v1/delete", param);
    },
    //禁用/开启供应商
    statusCustom({ commit }, param = {}) {
      return api.put("provider/v1/statu", param);
    },
    
  },
  mutations: {

  }
}