import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: null,
      data: null,
    },
  },
  mutations: {
    setLoginStatus(state, value) {
      state.user.loggedIn = value;
    },
    setUserData(state, data) {
      state.user.data = data;
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("setLoginStatus", (user !== null));
      if (user) {
        commit("setUserData", user);
      } else {
        commit("setUserData", null);
      }
    },
  },
});
