import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import LoginForm from './views/LoginForm.vue';
import OrderDescription from './views/OrderDescription.vue';
import OrderSummary from './views/OrderSummary.vue';
import UserControl from './views/UserControl.vue';
import store from './store';

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
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
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrderSummary,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm,
      meta: {
        guest: true,
      },
    },
    {
      path: '/users',
      name: 'users',
      component: UserControl,
      meta: {
        requiresAdmin: true,
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(address => address.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: '/login',
      });
    } else {
      next();
    }
  } else if (to.matched.some(address => address.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next({
        path: '/',
      });
    } else {
      next();
    }
  } else if (to.matched.some(address => address.meta.requiresAdmin)) {
    if (store.getters.roleStatus === '1') {
      next();
    } else {
      next({
        path: '/',
      });
    }
  } else {
    next();
  }
});

export default router;
