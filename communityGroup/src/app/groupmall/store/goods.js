import api from '../../../config/webapi';
export default {
  state: {
    businessList: []
  },
  actions: {
    saveClass({ commit }, param = {}) {
      return api.post("goods/class/v1/save", param);
    },
    saveGoods({},data){
      return api.post("goods/v1/save",data);
    },
    getClass({ commit }, param = {}) {
      return api.get("goods/class/v1/all", param);
    },
    deleteClass({ commit }, param = {}) {
      return api.delete("goods/class/v1/delete", param);
    },
  },
  mutations: {

  }
}