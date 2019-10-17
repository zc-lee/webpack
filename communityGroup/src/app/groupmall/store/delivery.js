import api from '../../../config/webapi';
export default {
  state: {
    businessList: []
  },
  actions: {
    getDeliveryUpdateBatch({ commit }, param = []) {
      return api.put("streets/v1/updateBatch", param);
    },
    saveCommunity({ commit }, param = {}) {
      return api.post("community/v1/save", param);
    },
    getCommunityList({ commit }, param = {}) {
      return api.post("community/v1/community", param)
    },
    deleteCommunity({ commit },param={}){
      return api.delete("community/v1/delete",param);
    },
    updataCommunity({ commit },param={}){
      return api.put("community/v1/update",param);
    },
    updataLine({ commit },param={}){
      return api.put("line/v1/update",param);
    },
    saveLine({ commit },param={}){
      return api.post("line/v1/save",param);
    },
    getLineList({ commit },param={}){
      return api.post("line/v1/condition",param);
    },
    deleteLine({ commit },param={}){
      return api.delete("line/v1/delete",param);
    }
  },
  mutations: {

  }
}