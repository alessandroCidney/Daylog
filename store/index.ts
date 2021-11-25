import { User } from 'firebase/auth';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  state: () => ({
    user: null as User | null,
  }),

  mutations: {
    SET_USER: (state, user: User | null) => {
      state.user = user;
    }
  },

  actions: {
    setUser ({ commit }, user) {
      commit('SET_USER', user);
    }
  },
});

export default store;