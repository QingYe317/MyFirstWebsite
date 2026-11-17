import { createRouter, createWebHistory } from 'vue-router'

// 路由配置：首页、作品、博客列表、文章详情、关于我
const routes = [
  { path: '/', component: () => import('../views/HomeView.vue') },
  { path: '/projects', component: () => import('../views/ProjectsView.vue') },
  { path: '/articles', component: () => import('../views/ArticlesView.vue') },
  { path: '/articles/:id', component: () => import('../views/ArticleDetailView.vue') },
  { path: '/about', component: () => import('../views/AboutView.vue') },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  // 切换页面时回到顶部
  scrollBehavior() {
    return { top: 0 }
  },
})
