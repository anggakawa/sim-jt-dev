/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import Vue from 'vue';
import Vuex from 'vuex';

// try to add this and change to axios again
// import axios from 'axios';

import api from './services/service.api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
    user_role: sessionStorage.getItem('user-role') || 0,
    status: '',
  },
  mutations: {
    authRequest: (state) => {
      state.status = 'loading';
    },
    authSuccess: (state, { token_data, role }) => {
      state.status = 'success';
      state.token = token_data;
      state.user_role = role.toString();
      // set authorization header
      api.defaults.headers.common['Authorization'] = "Bearer " + token_data;
    },
    authError: (state) => {
      state.status = 'error';
    },
  },
  actions: {
    async login({ commit }, user) {
      commit('authRequest');
      const result = await api.post('/token', user)
        .then((res) => {
          // console.log(res.data);
          if (res.data.success === true) {
            const token_data = res.data.token;
            const role = res.data.user_role;
            sessionStorage.setItem('user-role', role);
            localStorage.setItem('user-token', token_data);
            localStorage.setItem('user-id', res.data.user_id);
            localStorage.setItem('username', res.data.username);
            commit('authSuccess', { token_data, role });
            // dispatch()
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
    logout({ commit }, user) {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('user-token');
        localStorage.removeItem('user-id');
        sessionStorage.removeItem('user-role');
        localStorage.removeItem('username');
        resolve();
      });
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    roleStatus: state => state.user_role,
  },
});
