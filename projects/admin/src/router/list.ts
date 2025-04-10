import type { RouteItem } from '@/global'
import {
  HomeFilled,
  ChatDotRound,
  Document,
  Collection,
  PriceTag,
  Tickets,
  Link,
} from '@element-plus/icons-vue'

export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    title: '首页',
    path: '/',
    icon: HomeFilled,
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    title: '文章管理',
    path: '/article',
    icon: Document,
    name: 'Article',
    component: () => import('@/pages/Article.vue'),
  },
  {
    title: '分类管理',
    path: '/category',
    icon: Collection,
    name: 'Category',
    component: () => import('@/pages/Category.vue'),
  },
  {
    title: '标签管理',
    path: '/tag',
    icon: PriceTag,
    name: 'Tag',
    component: () => import('@/pages/Tag.vue'),
  },
  {
    title: '友链管理',
    path: '/link',
    icon: Link,
    component: () => import('@/pages/Link.vue'),
  },

  {
    title: '评论留言管理',
    path: '/comment',
    icon: ChatDotRound,
    component: () => import('@/pages/Comment.vue'),
  },
  {
    title: '表单管理',
    path: '/form',
    name: 'Form',
    icon: Tickets,
    component: () => import('@/pages/Form.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
  },
  // {
  //   title: '表单设计器',
  //   path: '/form-design',
  //   icon: MapLocation,
  //   component: () => import('@/pages/FormDesign.vue'),
  // },
] satisfies RouteItem[]
