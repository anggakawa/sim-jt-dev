import Vue from 'vue';
import Router from 'vue-router';
import Api from './services/service.api';
import Home from './views/Home.vue';
import LoginForm from './views/LoginForm.vue';
import OrderDescription from './views/OrderDescription.vue';
import OrderSummary from './views/OrderSummary.vue';
import UserControl from './views/UserControl.vue';
import ActivityControl from './views/ActivityControl.vue';
import UserPanel from './views/UserPanel.vue';
import ActivityTrack from './views/ActivityTrack.vue';
import ActivityOpt from './views/ActivityOpt.vue';
import MitraMonitor from './views/MitraMonitor.vue';
import STOoffice from './views/STOoffice.vue';
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
        // requiresAuth: true,
        checkAuthorized: true,
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
      path: '/activities',
      name: 'activities',
      component: ActivityControl,
      meta: {
        requiresAdmin: true,
      },
    },
    {
      path: '/my-account',
      name: 'my-account',
      component: UserPanel,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/activity-track',
      name: 'activity-track',
      component: ActivityTrack,
      meta: {
        requiresAdmin: true,
      },
    },
    {
      path: '/activity-options',
      name: 'activity-options',
      component: ActivityOpt,
      meta: {
        requiresAdmin: true,
      },
    },
    {
      path: '/mitra-review',
      name: 'mitra-review',
      component: MitraMonitor,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/STO-Office',
      name: 'STO-Office',
      component: STOoffice,
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
  } else if (to.matched.some(address => address.meta.checkAuthorized)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: '/login',
      });
    } else {
      if (store.getters.roleStatus === '3') {
        (async function checkAuthorized() {
          const result = await Api.get(`order-vendor/check/${to.params.order_id}`);
          if (result.data.length > 0) {
            if (result.data[0].replaced === 0) {
              next();
            }
          } else {
            next({
              path: '/',
            });
          }
        }());
      }
      next();
    }
  }
});

export default router;
