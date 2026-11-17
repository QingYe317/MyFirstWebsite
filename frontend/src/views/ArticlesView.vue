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

    <!-- 标签筛选：下划线页签 -->
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

    <!-- 行式列表（与首页「最新文章」同一设计语言） -->
    <div class="post-list">
      <router-link
        v-for="a in filteredArticles"
        :key="a.id"
        :to="`/articles/${a.id}`"
        class="post-item"
      >
        <div class="post-meta">
          <span class="post-date">{{ (a.createdAt || '').slice(0, 10) }}</span>
          <span class="badge">{{ a.tag }}</span>
        </div>
        <div class="post-body">
          <h3>{{ a.title }}</h3>
          <p>{{ a.summary }}</p>
        </div>
      </router-link>
      <p v-if="!filteredArticles.length" class="empty-tip">该标签下暂无文章</p>
    </div>
  </div>
</template>

<style scoped>
.page-title {
  margin-bottom: 6px;
}

.page-subtitle {
  color: var(--ink-3);
  font-size: 14px;
  margin: 0 0 24px;
}

.empty-tip {
  color: var(--ink-3);
  text-align: center;
  padding: 32px 0;
  font-size: 14px;
}
</style>
