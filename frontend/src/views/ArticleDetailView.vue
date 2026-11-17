<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getArticle } from '../api'

// 文章详情：正文按空行分段展示（纯文本，不做 Markdown 渲染）
const route = useRoute()
const article = ref(null)
const loading = ref(true)

// 阅读时长估算：按每分钟约 400 字计算
const readMinutes = computed(() =>
  Math.max(1, Math.ceil((article.value?.content || '').length / 400))
)

async function load() {
  loading.value = true
  article.value = (await getArticle(route.params.id)) || null
  loading.value = false
}

onMounted(load)

// 同组件内切换文章 id 时重新加载
watch(() => route.params.id, load)
</script>

<template>
  <div class="container">
    <div class="article-view">
      <router-link to="/articles" class="back-link">← 返回列表</router-link>

      <!-- 加载骨架：数据返回前先占位，避免错误提示闪现 -->
      <div v-if="loading" class="skeleton">
        <div class="skeleton-bar skeleton-title"></div>
        <div class="skeleton-bar"></div>
        <div class="skeleton-bar"></div>
        <div class="skeleton-bar"></div>
        <div class="skeleton-bar short"></div>
      </div>

      <!-- 正文 -->
      <template v-else-if="article">
        <div class="article-head">
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-head-meta">
            <span class="badge">{{ article.tag }}</span>
            <span class="meta">{{ (article.createdAt || '').slice(0, 10) }}</span>
            <span class="meta">· 预计阅读 {{ readMinutes }} 分钟</span>
          </div>
        </div>
        <div class="article-content">
          <p v-for="(para, i) in article.content.split(/\n+/)" :key="i">{{ para }}</p>
        </div>
      </template>

      <!-- 文章不存在 -->
      <div v-else class="article-missing">
        <p>文章不存在</p>
      </div>
    </div>
  </div>
</template>
