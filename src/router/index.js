import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import Home from '../views/Home';
import Login from '../views/Login';
import Account from '../views/Account';
import Repo from '../views/Repo';
import New from '../views/New';
import Keys from '../views/Keys';
import Key from '../views/Key';
import UploadKey from '../views/UploadKey';

Vue.use(VueRouter);
store.dispatch('init');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/repo',
    name: 'Repo',
    component: Repo,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/new',
    name: 'New',
    component: New,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/keys',
    name: 'Keys',
    component: Keys,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/key',
    name: 'Key',
    component: Key,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/upload-key',
    name: 'UploadKey',
    component: UploadKey,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  void from;
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    return next({ name: 'Login' });
  }
  next();
});

export default router;
