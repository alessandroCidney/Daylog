import { StoreUser, FirestoreUser } from '@/types/users';
import { auth } from '@/plugins/firebase';

import Database from '@/services/database';

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

    firestoreUser (state): FirestoreUser | undefined {
      return state.user?.firestoreUser
    },

    isAuthenticated (state): boolean {
      return !!state.user;
    },
  },

  mutations: {
    setUser (state, payload: StoreUser | null) {
      Vue.set(state, 'user', payload);
    },
  },

  actions: {
    async getCurrentFirestoreUser ({ state, commit }): Promise<void> {
      if (!state.user) {
        return;
      };

      const usersDatabase = new Database('users');
      const results = await usersDatabase.getWhere(
        'email',
        state.user.firestoreUser.email
      ) as Record<string, FirestoreUser>;

      if (!results) {
        return;
      };

      const user = Object.values(results)[0];

      commit('setUser', {
        ...state.user,
        firestoreUser: user
      });
    }
  } 
});

export default createStore;