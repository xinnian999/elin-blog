import {
  HomeFilled,
  Document,
  User,
  ChatRound,
  MapLocation,
  Link,
  CollectionTag,
} from '@element-plus/icons-vue'

export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    title: '首页',
    path: '/home',
    icon: HomeFilled,
    component: () => import('@/pages/Home.vue'),
  },
  {
    title: '文章管理',
    path: '/article',
    icon: Document,
    component: () => import('@/pages/article/ArticleList.vue'),
  },
  {
    title: '分类管理',
    path: '/category',
    icon: Link,
    component: () => import('../pages/Category.vue'),
  },
  {
    title: '友链管理',
    path: '/link',
    icon: Link,
    component: () => import('../pages/Link.vue'),
  },
  {
    title: '标签管理',
    path: '/tag',
    icon: CollectionTag,
    component: () => import('../pages/Tag.vue'),
  },
  {
    title: '评论留言管理',
    path: '/comment',
    icon: Link,
    component: () => import('../pages/Comment.vue'),
  },
  {
    title: '表单管理',
    path: '/form',
    icon: MapLocation,
    component: () => import('@/pages/Form.vue'),
  },
]
