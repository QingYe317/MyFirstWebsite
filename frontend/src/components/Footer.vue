<script setup>
import { ref, onMounted } from 'vue'
import { getProfile } from '../api'

// 页脚展示个人信息中的 GitHub / 邮箱链接
const profile = ref({})

onMounted(async () => {
  profile.value = await getProfile()
})

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <!-- 品牌 -->
      <div class="footer-brand">
        <div class="logo">
          <span class="logo-icon">✦</span>
          QingYe
        </div>
        <p>长期维护的个人数字空间与技术作品集，用 Vue3 + Spring Boot 前后端分离搭建。</p>
      </div>

      <!-- 导航与社交 -->
      <nav class="footer-nav">
        <router-link to="/">首页</router-link>
        <router-link to="/projects">作品</router-link>
        <router-link to="/articles">博客</router-link>
        <router-link to="/about">关于我</router-link>
        <a :href="profile.github || 'https://github.com/QingYe317'" target="_blank">GitHub</a>
        <a v-if="profile.email" :href="`mailto:${profile.email}`">邮箱</a>
      </nav>
    </div>

    <div class="footer-bottom">
      © {{ year }} QingYe · 源于 Web 课程作业 · 持续维护中
    </div>
  </footer>
</template>
