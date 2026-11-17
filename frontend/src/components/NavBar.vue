<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

// 移动端抽屉菜单开关
const open = ref(false)
const route = useRoute()

function toggle() {
  open.value = !open.value
}

// 路由切换后自动收起
watch(
  () => route.fullPath,
  () => (open.value = false)
)

// 抽屉打开时锁定页面滚动
watch(open, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

function onKeydown(e) {
  if (e.key === 'Escape') open.value = false
}

// 切换到桌面宽度时强制收起，避免滚动锁残留
function onResize() {
  if (window.innerWidth > 768) open.value = false
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="navbar">
    <div class="nav-inner container">
      <router-link to="/" class="logo" @click="open = false">
        <span class="logo-icon">✦</span>
        QingYe
      </router-link>
      <button
        class="menu-btn"
        :class="{ open }"
        :aria-expanded="open"
        aria-controls="site-menu"
        :aria-label="open ? '关闭菜单' : '打开菜单'"
        @click="toggle"
      >
        <span class="menu-bar"></span>
        <span class="menu-bar"></span>
      </button>
      <nav id="site-menu" class="nav-links" :class="{ open }">
        <router-link to="/">首页</router-link>
        <router-link to="/projects">作品</router-link>
        <router-link to="/articles">博客</router-link>
        <router-link to="/about">关于我</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* 组件特有样式：菜单按钮与抽屉在全局 style.css 中定义 */
</style>
