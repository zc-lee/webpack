import Vue from 'vue'
import Vuex from 'vuex'
import api from '../../../config/webapi';
Vue.use(Vuex);

import delivery from './delivery.js';

import goods from './goods';
import systemSetup from './modules/systemSetup';
import userInfo from './modules/userInfo';
import custom from './custom';
import setup from './modules/setup';
import article from './modules/article';
import seckill from './modules/seckill';

export default new Vuex.Store({
  modules: {
    delivery,
    userInfo,
    systemSetup,
    goods,
    custom,
    setup,
    article,
    seckill,
  },
  state: {
    address: {
      city     : [],
      province : [],
      area     : [],
      community: [],   //小区
      location : ""    //经纬度
    }
  },
  actions: {
    //取省市区，单元一体接口
    getAddress({
      commit
    }, param = {}) {
      if (param.type == 'area') {
        return api.get('areas/v1/cityId', {
          cityId: param.id
        })
      } else if (param.type == 'province') {
        return api.get('provinces/v1/all', {});
      } else if (param.type == 'city') {
        return api.get('cities/v1/provinceId', {
          provinceId: param.id
        })
      } else if (param.type == 'community') {
        return api.get('streets/v1/areaId', {
          areaId: param.id
        })
      } else if (param.type == 'location') {
        return api.get('http://restapi.amap.com/v3/geocode/geo', {
          key    : "5834a95f0e9d1a6794a4c21dd275f6cd",
          s      : "rsv3",
          city   : "35",
          address: param.address
        }, "")
      }
    },
    getAllAddress({
      commit
    }, param = []) {
      if (param.length > 0) {
        return api.all(param)
      } else {
        return new Promise((resolve, reject) => { });
      }
    }
  },
  mutations: {}
})