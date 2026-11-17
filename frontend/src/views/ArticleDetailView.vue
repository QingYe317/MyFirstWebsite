<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getArticle } from '../api'

// 文章详情：正文按空行分段展示（纯文本，不做 Markdown 渲染）
const route = useRoute()
const article = ref(null)

// 阅读时长估算：按每分钟约 400 字计算
const readMinutes = computed(() =>
  Math.max(1, Math.ceil((article.value?.content || '').length / 400))
)

onMounted(async () => {
  article.value = await getArticle(route.params.id)
})
</script>

<template>
  <div class="container">
    <template v-if="article">
      <div class="article-head">
        <h1 class="page-title">{{ article.title }}</h1>
        <div class="article-head-meta">
          <span class="badge">{{ article.tag }}</span>
          <span class="meta">📅 {{ (article.createdAt || '').slice(0, 10) }}</span>
          <span class="meta">⏱ 预计阅读 {{ readMinutes }} 分钟</span>
        </div>
      </div>
      <div class="article-content">
        <p v-for="(para, i) in article.content.split(/\n+/)" :key="i">{{ para }}</p>
      </div>
      <router-link to="/articles" class="back-link">← 返回列表</router-link>
    </template>
    <p v-else>文章不存在</p>
  </div>
</template>
