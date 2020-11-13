import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    userData(state, data){
      state.user = data
    }
  },
  getters: {
    user: state => state.user,
  },
  actions: {},
  modules: {},
});
