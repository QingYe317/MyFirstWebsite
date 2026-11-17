<script setup>
// 应用根组件：导航栏 + 页面内容（带切换过渡）+ 页脚 + 回到顶部按钮
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

// 滚动超过一屏后显示「回到顶部」按钮
const showTop = ref(false)

function onScroll() {
  showTop.value = window.scrollY > 400
}

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <NavBar />
  <main class="main">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <Footer />

  <!-- 回到顶部 -->
  <transition name="page">
    <button v-if="showTop" class="back-top" aria-label="回到顶部" @click="toTop">↑</button>
  </transition>
</template>
