import Vue from "vue";
import VueRouter from "vue-router";
import RouterGuards from "./config/router.guards";
import adminRoutes from "./admin";
import loginRoutes from "./login";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [...adminRoutes, ...loginRoutes],
});
// 路由守卫
new RouterGuards(router).initRouterGuards();

export default router;
