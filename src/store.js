import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    specArr: [],
    tableData: [],
    demoTableData: [{ "specs": ["红色", "L", "蚕丝"], "name": "奶粉", "stock": "100", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["红色", "L", "涤纶"], "name": "奶粉", "stock": "0", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["红色", "L", "棉麻"], "name": "奶粉", "stock": "0", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["红色", "M", "蚕丝"], "name": "奶粉", "stock": "0", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["红色", "M", "涤纶"], "name": "奶粉", "stock": "55", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["红色", "M", "棉麻"], "name": "奶粉", "stock": "12", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["红色", "S", "蚕丝"], "name": "奶粉", "stock": "0", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["红色", "S", "涤纶"], "name": "奶粉", "stock": "15", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["红色", "S", "棉麻"], "name": "奶粉", "stock": "100", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["黄色", "L", "蚕丝"], "name": "奶粉", "stock": "0", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["黄色", "L", "涤纶"], "name": "奶粉", "stock": "100", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["黄色", "L", "棉麻"], "name": "奶粉", "stock": "0", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["黄色", "M", "蚕丝"], "name": "奶粉", "stock": "0", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["黄色", "M", "涤纶"], "name": "奶粉", "stock": "100", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["黄色", "M", "棉麻"], "name": "奶粉", "stock": "0", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["黄色", "S", "蚕丝"], "name": "奶粉", "stock": "100", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["黄色", "S", "涤纶"], "name": "奶粉", "stock": "2", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["黄色", "S", "棉麻"], "name": "奶粉", "stock": "0", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["蓝色", "L", "蚕丝"], "name": "奶粉", "stock": "0", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["蓝色", "L", "涤纶"], "name": "奶粉", "stock": "56", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["蓝色", "L", "棉麻"], "name": "奶粉", "stock": "15", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["蓝色", "M", "蚕丝"], "name": "奶粉", "stock": "100", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["蓝色", "M", "涤纶"], "name": "奶粉", "stock": "3", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["蓝色", "M", "棉麻"], "name": "奶粉", "stock": "0", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["蓝色", "S", "蚕丝"], "name": "奶粉", "stock": "100", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["蓝色", "S", "涤纶"], "name": "奶粉", "stock": "0", "price": "150", "picture": "", "sku": "", "spu": "" }, { "specs": ["蓝色", "S", "棉麻"], "name": "奶粉", "stock": "100", "price": "150", "picture": "", "sku": "", "spu": "" }],
    demoSpecArr: [{ "name": "颜色", "conName": ["红色", "黄色", "蓝色"] }, { "name": "尺码", "conName": ["L", "M", "S"] }, { "name": "材料", "conName": ["蚕丝", "涤纶", "棉麻"] }]
  },
  mutations: {
    getSpecArr(state, data) {
      state.specArr = data
    },
    getTableData(state, data) {
      state.tableData = data
    }
  },
  actions: {
    getSpecArr(state, data) {
      state.commit('getSpecArr', data)
    },
    getTableData(state, data) {
      state.commit('getTableData', data)
    }
  }
});
