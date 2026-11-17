<script setup>
import { ref, onMounted } from 'vue'
import { getProfile } from '../api'
import avatarImg from '../assets/avatar.jpg'

// 关于我：左栏个人信息（粘性），右栏技能 / 进行中 / 学习经历
const profile = ref({})
const copied = ref(false)

// 技能分组展示（按类别整理，数据来自个人技能概况）
const skillGroups = [
  { name: '编程语言', items: ['Java（最熟悉）', 'C', 'Python 入门'] },
  { name: '后端技术', items: ['Spring Boot', 'MyBatis', 'JDBC'] },
  { name: '前端技术', items: ['HTML / CSS', 'JavaScript', 'Vue', 'Ajax'] },
  { name: '数据库与工具', items: ['MySQL', 'Maven', 'Git'] },
]

// 当前进行中（细进度条列表）
const ongoing = [
  { name: 'LeetCode Hot 100', desc: '每天 1-3 题，已完成 21 题', percent: 21 },
  { name: '苍穹外卖', desc: '已于 10 月 25 日完成跟课', percent: 100 },
  { name: '个人网站', desc: 'Vue3 + Spring Boot，持续迭代中', percent: 50 },
]

// 学习经历时间线（真实轨迹）
const timeline = [
  { year: '2025.09', title: '踏入大学校园', desc: '开始接触 C 语言与计算机基础，写下第一行 Hello World。' },
  { year: '2026.03', title: '接触 Java', desc: '跟着 B 站黑马程序员系统学习 Java 面向对象与基础语法。' },
  { year: '2026.07', title: '第一个完整项目', desc: '完成 Tlias 智能学习辅助系统，实现增删改查与数据统计功能。' },
  { year: '2026.09', title: '苍穹外卖实战', desc: '跟进大型实战项目，接触 Redis、WebSocket 与 Nginx。' },
  { year: '2026.11', title: '刷题与沉淀', desc: '启动 LeetCode Hot 100 计划，并用 Vue3 + Spring Boot 搭建了这个个人网站。' },
]

// 一键复制邮箱（clipboard 不可用时降级为 execCommand）
async function copyEmail() {
  const email = profile.value.email || ''
  if (!email) return
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(email)
    } else {
      const input = document.createElement('textarea')
      input.value = email
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
    }
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    // 复制失败时静默处理
  }
}

onMounted(async () => {
  profile.value = await getProfile()
})
</script>

<template>
  <div class="container">
    <h1 class="page-title">关于我</h1>

    <div class="about-layout">
      <!-- 左栏：个人信息（桌面端粘性） -->
      <aside class="about-side">
        <div class="hero-portrait"><img :src="avatarImg" alt="头像" /></div>
        <h2 class="about-name">{{ profile.name }}</h2>
        <p class="about-role">{{ profile.title }}</p>
        <p class="about-bio">{{ profile.bio }}</p>

        <ul class="about-info">
          <li v-if="profile.email"><span>邮箱</span>{{ profile.email }}</li>
          <li v-if="profile.github">
            <span>GitHub</span>
            <a :href="profile.github" target="_blank" rel="noopener noreferrer">
              {{ profile.github.replace('https://github.com/', '') }}
            </a>
          </li>
        </ul>

        <div class="contact-actions">
          <button class="btn btn-primary" @click="copyEmail">复制邮箱</button>
          <a
            v-if="profile.github"
            :href="profile.github"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-ghost"
          >
            访问 GitHub
          </a>
        </div>
        <p v-if="copied" class="copy-tip">已复制到剪贴板</p>
      </aside>

      <!-- 右栏：技能 / 进行中 / 经历 -->
      <div class="about-main">
        <section class="section">
          <div class="section-head">
            <h2>技能图谱</h2>
          </div>
          <div class="skill-groups">
            <div v-for="g in skillGroups" :key="g.name" class="skill-group">
              <h3 class="skill-group-name">{{ g.name }}</h3>
              <div class="tags skill-group-items">
                <span v-for="item in g.items" :key="item" class="tag tag-small">{{ item }}</span>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-head">
            <h2>当前进行中</h2>
          </div>
          <div class="ongoing-list">
            <div v-for="o in ongoing" :key="o.name" class="ongoing-item">
              <div class="ongoing-head">
                <span class="ongoing-name">{{ o.name }}</span>
                <span class="ongoing-percent">{{ o.percent }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: o.percent + '%' }"></div>
              </div>
              <p class="ongoing-desc">{{ o.desc }}</p>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-head">
            <h2>我的学习经历</h2>
          </div>
          <div class="timeline">
            <div v-for="item in timeline" :key="item.year" class="timeline-item">
              <div class="timeline-year">{{ item.year }}</div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
