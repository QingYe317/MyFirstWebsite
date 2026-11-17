<script setup>
import { ref, onMounted } from 'vue'
import { getProjects } from '../api'

// 作品列表
const projects = ref([])

onMounted(async () => {
  projects.value = await getProjects()
})

// 项目卡片图标：按项目名匹配，匹配不到用默认图标
function projectIcon(p) {
  const name = p.name || ''
  if (name.includes('外卖')) return '🍃'
  if (name.includes('网站')) return '🌐'
  if (name.includes('Tlias')) return '📚'
  return '📦'
}
</script>

<template>
  <div class="container">
    <h1 class="page-title">作品列表</h1>
    <p class="page-subtitle">记录我做过的一些课程设计与练手项目</p>
    <div class="grid-3">
      <div v-for="(p, i) in projects" :key="p.id" class="card">
        <span class="card-index">{{ String(i + 1).padStart(2, '0') }}</span>
        <h3><span class="project-icon">{{ projectIcon(p) }}</span>{{ p.name }}</h3>
        <p class="card-desc">{{ p.description }}</p>
        <div class="tags">
          <span v-for="t in (p.techStack || '').split(',')" :key="t" class="tag tag-small">{{ t }}</span>
        </div>
        <a v-if="p.link" :href="p.link" target="_blank" class="card-link">查看项目 →</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-subtitle {
  color: var(--text-light);
  font-size: 14px;
  margin: -14px 0 22px;
}
</style>
