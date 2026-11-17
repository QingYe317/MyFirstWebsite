<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { getProfile, getProjects, getArticles } from '../api'
import avatarImg from '../assets/avatar.jpg'

// 首页数据：个人信息 + 作品 + 文章（完整列表用于统计，精选前 3 个）
const profile = ref({})
const projects = ref([])
const articles = ref([])

const featuredProjects = computed(() => projects.value.slice(0, 3))
const mainProject = computed(() => featuredProjects.value[0] || null)
const sideProjects = computed(() => featuredProjects.value.slice(1))
const latestArticles = computed(() => articles.value.slice(0, 3))

// 统计条：项目数 / 文章数 / 技能数（由接口数据实时计算）
const skillCount = computed(() => (profile.value.skills || '').split(',').filter(Boolean).length)
const stats = computed(() => [
  { num: projects.value.length, label: '上线项目' },
  { num: articles.value.length, label: '博客文章' },
  { num: skillCount.value, label: '掌握技能' },
])

// 打字机效果：身份句只播放一轮——打完静止、光标淡出，不做删除重打
// 系统偏好「减少动态效果」时直接显示全文
const typed = ref('')
const typingDone = ref(false)
let timer = null

function startTyping() {
  clearTimeout(timer)
  typed.value = ''
  typingDone.value = false
  const text = profile.value.title || ''
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || !text) {
    typed.value = text
    typingDone.value = true
    return
  }
  let i = 0
  function tick() {
    i++
    typed.value = text.slice(0, i)
    if (i < text.length) {
      timer = setTimeout(tick, 90)
    } else {
      typingDone.value = true
    }
  }
  tick()
}

onMounted(async () => {
  profile.value = await getProfile()
  projects.value = await getProjects()
  articles.value = await getArticles()
})

// profile 加载完成后启动打字机
watch(
  () => profile.value.title,
  (val) => {
    if (val) startTyping()
  }
)

onUnmounted(() => clearTimeout(timer))

// 项目名缩写：占位封面与角标使用（去空格取前两字，拉丁字母大写）
function abbr(name) {
  return (name || '').replace(/\s+/g, '').slice(0, 2).toUpperCase()
}
</script>

<template>
  <div class="container">
    <!-- Hero：左栏文字构成视觉中心，右栏头像 + 状态 -->
    <section class="hero">
      <div class="hero-main">
        <p class="hero-greeting">你好，我是</p>
        <h1 class="hero-name">{{ profile.name }}<span class="hero-dot">.</span></h1>
        <p class="typing-line">
          {{ typed }}<span class="type-cursor" :class="{ done: typingDone }">|</span>
        </p>
        <p class="hero-intro">{{ profile.bio }}</p>
        <div class="hero-actions">
          <router-link to="/projects" class="btn btn-primary">查看我的作品</router-link>
          <a
            :href="profile.github || 'https://github.com/QingYe317'"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-ghost"
          >
            GitHub 主页
          </a>
        </div>
        <div class="tags hero-tags">
          <span v-for="s in (profile.skills || '').split(',')" :key="s" class="tag">{{ s }}</span>
        </div>
      </div>
      <aside class="hero-side">
        <div class="hero-portrait"><img :src="avatarImg" alt="头像" /></div>
        <div class="hero-status"><span class="status-dot"></span>正在刷 LeetCode Hot 100 · 每天 1-3 题</div>
      </aside>
    </section>

    <!-- 数据信息带 -->
    <section class="stat-strip">
      <div v-for="s in stats" :key="s.label" class="stat-item">
        <span class="stat-num">{{ s.num }}</span>
        <span class="stat-label">{{ s.label }}</span>
      </div>
    </section>

    <!-- 精选作品：1 个重点 + 2 个次级，整卡可点 -->
    <section class="section">
      <div class="section-head">
        <h2>精选作品</h2>
        <router-link to="/projects">查看全部 →</router-link>
      </div>
      <div class="featured-grid">
        <a
          v-if="mainProject"
          :href="mainProject.link"
          target="_blank"
          rel="noopener noreferrer"
          class="card featured-main"
        >
          <div class="featured-cover">
            <span class="cover-abbr">{{ abbr(mainProject.name) }}</span>
          </div>
          <h3>{{ mainProject.name }}</h3>
          <p class="card-desc">{{ mainProject.description }}</p>
          <div class="tags">
            <span v-for="t in (mainProject.techStack || '').split(',')" :key="t" class="tag tag-small">{{ t }}</span>
          </div>
          <span class="card-link">查看项目 →</span>
        </a>
        <a
          v-for="p in sideProjects"
          :key="p.id"
          :href="p.link"
          target="_blank"
          rel="noopener noreferrer"
          class="card featured-side"
        >
          <h3><span class="side-abbr">{{ abbr(p.name) }}</span>{{ p.name }}</h3>
          <p class="card-desc">{{ p.description }}</p>
          <div class="tags">
            <span v-for="t in (p.techStack || '').split(',')" :key="t" class="tag tag-small">{{ t }}</span>
          </div>
        </a>
      </div>
    </section>

    <!-- 最新文章：行式列表 -->
    <section class="section">
      <div class="section-head">
        <h2>最新文章</h2>
        <router-link to="/articles">查看全部 →</router-link>
      </div>
      <div class="post-list">
        <router-link
          v-for="a in latestArticles"
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
      </div>
    </section>
  </div>
</template>
