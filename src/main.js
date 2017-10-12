// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from './components/seller/seller.vue';

import './common/scss/index.scss';

Vue.use(VueRouter);

Vue.config.productionTip = false;

// 2. 定义路由
const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
];

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  linkActiveClass: 'active',
  routes
});

// 4. 创建和挂载根实例。
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
  el: '#app'
});

// 默认打开商品tab
router.push('/goods');
