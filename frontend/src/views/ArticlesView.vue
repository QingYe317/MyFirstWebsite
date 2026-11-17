<script setup>
import { ref, computed, onMounted } from 'vue'
import { getArticles } from '../api'

// 博客列表：按标签筛选（纯前端过滤）
const articles = ref([])
const activeTag = ref('全部')

// 从文章数据中提取所有标签（去重）
const tags = computed(() => [
  '全部',
  ...new Set(articles.value.map((a) => a.tag).filter(Boolean)),
])

const filteredArticles = computed(() =>
  activeTag.value === '全部'
    ? articles.value
    : articles.value.filter((a) => a.tag === activeTag.value)
)

onMounted(async () => {
  articles.value = await getArticles()
})
</script>

<template>
  <div class="container">
    <h1 class="page-title">博客列表</h1>
    <p class="page-subtitle">记录学习中的笔记、踩坑与心得</p>

    <!-- 标签筛选 -->
    <div class="filter-tabs">
      <button
        v-for="t in tags"
        :key="t"
        class="filter-tab"
        :class="{ active: activeTag === t }"
        @click="activeTag = t"
      >
        {{ t }}
      </button>
    </div>

    <div class="article-list">
      <router-link
        v-for="a in filteredArticles"
        :key="a.id"
        :to="`/articles/${a.id}`"
        class="article-item"
      >
        <h3>{{ a.title }}</h3>
        <p>{{ a.summary }}</p>
        <span class="meta">
          <span class="badge">{{ a.tag }}</span>
          {{ (a.createdAt || '').slice(0, 10) }}
        </span>
      </router-link>
      <p v-if="!filteredArticles.length" class="empty-tip">该标签下暂无文章</p>
    </div>
  </div>
</template>

<style scoped>
.page-subtitle {
  color: var(--text-light);
  font-size: 14px;
  margin: -14px 0 22px;
}

.empty-tip {
  color: var(--text-light);
  text-align: center;
  padding: 32px 0;
  font-size: 14px;
}
</style>
