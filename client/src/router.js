import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import LoginForm from './views/LoginForm.vue';
import OrderDescription from './views/OrderDescription.vue';
import OrderSummary from './views/OrderSummary.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/order/:order_id',
      name: 'order',
      component: OrderDescription,
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrderSummary,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
