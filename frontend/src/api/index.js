import axios from 'axios'
import { fallbackProfile, fallbackProjects, fallbackArticles } from '../data/fallback'

// axios 实例：走 Vite 代理，/api -> http://localhost:8080
const http = axios.create({
  baseURL: '/api',
  timeout: 3000,
})

// 统一请求封装：后端未启动或请求失败时，返回兜底数据，保证页面不白屏
async function fetchWithFallback(url, fallback) {
  try {
    const res = await http.get(url)
    if (res.data && res.data.code === 200) {
      return res.data.data
    }
    return fallback
  } catch {
    return fallback
  }
}

export const getProfile = () => fetchWithFallback('/profile', fallbackProfile)
export const getProjects = () => fetchWithFallback('/projects', fallbackProjects)
export const getArticles = () => fetchWithFallback('/articles', fallbackArticles)

// 文章详情：兜底时从示例数据里按 id 查找
export const getArticle = (id) =>
  fetchWithFallback(`/articles/${id}`, fallbackArticles.find((a) => a.id === Number(id)))
