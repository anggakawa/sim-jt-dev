import Vue from 'vue';
import './plugins/vuetify';
import Axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';


Vue.config.productionTip = false;

const token = localStorage.getItem('user-token');
if (token) {
  Axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
