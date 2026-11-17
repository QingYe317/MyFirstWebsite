<script setup>
import { ref, onMounted } from 'vue'
import { getProjects } from '../api'
import { abbr } from '../utils'

// 作品列表：大卡纵向排列，封面占位 + 项目名缩写
const projects = ref([])

onMounted(async () => {
  projects.value = await getProjects()
})
</script>

<template>
  <div class="container">
    <h1 class="page-title">作品列表</h1>
    <p class="page-subtitle">记录我做过的一些课程设计与练手项目</p>

    <div class="project-list">
      <component
        :is="p.link ? 'a' : 'div'"
        v-for="p in projects"
        :key="p.id"
        v-bind="p.link ? { href: p.link, target: '_blank', rel: 'noopener noreferrer' } : {}"
        class="card project-card"
      >
        <div class="project-cover">
          <span class="cover-abbr">{{ abbr(p.name) }}</span>
        </div>
        <div class="project-body">
          <h3>{{ p.name }}</h3>
          <p class="card-desc">{{ p.description }}</p>
          <div class="tags">
            <span v-for="t in (p.techStack || '').split(',')" :key="t" class="tag tag-small">{{ t }}</span>
          </div>
          <span v-if="p.link" class="btn btn-ghost project-cta">查看项目 →</span>
        </div>
      </component>
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
</style>
