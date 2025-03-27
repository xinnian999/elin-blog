import { createRouter, createWebHistory } from "vue-router";
import routes from "./list";

// 创建路由实例
const router = createRouter({
  routes,
  history: createWebHistory("./"),
});

// 路由守卫监听登陆状态，非登陆状态下只能访问/login
// router.beforeEach((to, from, next) => {
//   if (to.path === "/login") {
//     next();
//   }

//   if (cookie.get("super_admin_blog_token") || cookie.get("admin_blog_token")) {
//     next();
//   } else {
//     next({ path: "/login" });
//   }
// });

export default router;
