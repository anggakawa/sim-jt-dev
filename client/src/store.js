/* eslint-disable camelcase */
import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
  },
  mutations: {
    authRequest: (state) => {
      state.status = 'loading';
    },
    authSuccess: (state, token) => {
      state.status = 'success';
      state.token = token;
    },
    authError: (state) => {
      state.status = 'error';
    },
  },
  actions: {
    async login({ commit }, user) {
      commit('authRequest');
      const result = await axios.post('http://localhost:3000/api/token', user)
        .then((res) => {
          console.log(res);
          if (res.data.success === true) {
            const token_data = res.data.token;
            localStorage.setItem('user-token', token_data);
            commit('authSuccess', token_data);
          } else {
            commit('authError');
          }
          return res;
        })
        .catch((err) => {
          commit('authError', err);
          localStorage.removeItem('user-token');
          // we need to test and handle if server is error and see how front end handle it
        });
      return result;
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },
});
