import type { RouteItem } from '@/global'
import { HomeFilled, MapLocation } from '@element-plus/icons-vue'

export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    title: '首页',
    path: '/home',
    icon: HomeFilled,
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  // {
  //   title: '文章管理',
  //   path: '/article',
  //   icon: Document,
  //   component: () => import('@/pages/article/ArticleList.vue'),
  // },
  // {
  //   title: '分类管理',
  //   path: '/category',
  //   icon: Link,
  //   component: () => import('../pages/Category.vue'),
  // },
  // {
  //   title: '友链管理',
  //   path: '/link',
  //   icon: Link,
  //   component: () => import('../pages/Link.vue'),
  // },
  // {
  //   title: '标签管理',
  //   path: '/tag',
  //   icon: CollectionTag,
  //   component: () => import('../pages/Tag.vue'),
  // },
  // {
  //   title: '评论留言管理',
  //   path: '/comment',
  //   icon: Link,
  //   component: () => import('../pages/Comment.vue'),
  // },
  {
    title: '表单管理',
    path: '/form',
    name: 'Form',
    icon: MapLocation,
    component: () => import('@/pages/Form.vue'),
  },
  // {
  //   title: '表单设计器',
  //   path: '/form-design',
  //   icon: MapLocation,
  //   component: () => import('@/pages/FormDesign.vue'),
  // },
] satisfies RouteItem[]
