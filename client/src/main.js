import Vue from 'vue';
import './plugins/vuetify';
import Axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import jwtDecode from 'jwt-decode';

Vue.config.productionTip = false;

const token = localStorage.getItem('user-token');
if (token) {
  const decode = jwtDecode(token);
  if (Date.now() / 1000 > decode.exp) {
    localStorage.removeItem('user-token');
  } else {
    Axios.defaults.headers.common['Authorization'] = "Bearer " + token;
  }
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
