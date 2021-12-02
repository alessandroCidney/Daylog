import { StoreUser } from '@/types/users';
import { auth } from '@/plugins/firebase';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const createStore = () => new Vuex.Store({
  state: () => ({
    user: null as StoreUser | null,
  }),

  getters: {
    user (state): StoreUser | null {
      return state.user;
    },

    isAuthenticated (state): boolean {
      return !!state.user;
    },
  },

  mutations: {
    setUser (state, payload: StoreUser | null) {
      Vue.set(state, 'user', payload);
    }
  },
});

export default createStore;