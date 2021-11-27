import { User } from 'firebase/auth';
import { auth } from '@/plugins/firebase';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const createStore = () => new Vuex.Store({
  state: () => ({
    user: null as User | null,
  }),

  getters: {
    user (state): User | null {
      return state.user;
    },

    isAuthenticated (state): boolean {
      return !!state.user;
    }    
  },

  mutations: {
    setUser (state, payload: User | null) {
      Vue.set(state, 'user', payload);
    }
  },
});

export default createStore;