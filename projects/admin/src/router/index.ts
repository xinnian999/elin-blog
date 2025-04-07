import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import routes from './list'

// 创建路由实例
const router = createRouter({
  routes,
  history: createWebHistory('./'),
})

// 路由守卫监听登陆状态，非登陆状态下只能访问/login
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }

  if (Cookies.get('auth_token')) {
    next()
  } else {
    window.location.href = '/login'
  }
})

export default router
