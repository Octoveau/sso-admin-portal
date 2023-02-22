import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterGuards from './config/routerGuards';
import adminRoutes from './admin';
import authRoutes from './auth';
import openLoginRoutes from './openLogin';
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/sso-login/' : '/',
  routes: [...openLoginRoutes, ...adminRoutes, ...authRoutes],
});
// 路由守卫
new RouterGuards(router).initRouterGuards();
export default router;
