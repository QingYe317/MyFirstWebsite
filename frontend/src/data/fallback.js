// 兜底示例数据：与后端接口返回结构保持一致，后端未启动时使用
export const fallbackProfile = {
  id: 1,
  name: 'QingYe',
  title: '计算机科学与技术专业 · 大二学生',
  avatar: '🧑‍💻',
  bio: '大二学生，喜欢武侠与玄幻游戏',
  email: '18270051397@163.com',
  github: 'https://github.com/QingYe317',
  location: '',
  skills: 'Java,Spring Boot,MyBatis,MySQL,Vue,HTML/CSS/JS,Git,Maven',
}

export const fallbackProjects = [
  {
    id: 1,
    name: 'Tlias 智能学习辅助系统',
    description:
      '基于 JavaSE、Spring Boot、MySQL 与 MyBatis 完成的后台管理项目，实现部门与员工管理的增删改查，并在此基础上新增了数据统计功能。',
    techStack: 'Java,Spring Boot,MyBatis,MySQL',
    link: 'https://github.com/QingYe317/tlias-web-management',
    sortOrder: 1,
  },
  {
    id: 2,
    name: '苍穹外卖',
    description:
      '跟随实战课程完成的外卖项目，实现管理端与客户端功能开发，实践了 Redis 缓存、WebSocket 实时推送、PageHelper 分页等技术。',
    techStack: 'Spring Boot,Redis,WebSocket,MySQL,Vue',
    link: 'https://gitee.com/prior-people/sky-take-out',
    sortOrder: 2,
  },
  {
    id: 3,
    name: '个人网站',
    description:
      '你正在浏览的这个网站：Vue3 + Spring Boot 前后端分离搭建，用于展示个人作品与学习笔记，也是前端工程化的一次完整练习。',
    techStack: 'Vue3,Vue Router,Axios,Spring Boot,MySQL',
    link: 'https://github.com/QingYe317',
    sortOrder: 3,
  },
]

export const fallbackArticles = [
  {
    id: 1,
    title: 'LeetCode Hot 100 刷题进行时',
    summary: '11 月 1 日开始刷 LeetCode Hot 100，每天保持 1-3 题，记录当前进度与刷题感受。',
    content: '11 月 1 日正式启动 LeetCode Hot 100 刷题计划，目标是过一遍Hot 100。\n\n 11.16 进度：完成第 21 题，每天做 1-3 题。由于之前算法题做得不多，只在大一上学期做过一些，后面接触很少，现在算从头捡起来，只是初级阶段。\n\n Q:为什么之前不接触? A：因为算法题给我的感觉像中学时期的数学题，很多时候不是你会了，而是你记住了。我个人比较讨厌这种感觉，好像不是属于自己的东西，所以就尽量不做算法。 \n\n做了几周的感受：1）大部分都不会做，只能看题解领悟后再做一遍；2）力扣里面的题不需要你写输入输出，如果参加io制比赛，刚上手可能会有点懵；3）有些题一上手没思路很正常，先想暴力解再逐步优化。\n\n刷题节奏不求快，稳定坚持比突击更重要。计划每完成 25 题回来复盘一次，但我应该大概率做不到(滑稽)',
    tag: '算法',
    createdAt: '2026-11-10 21:30:00',
  },
  {
    id: 2,
    title: 'Tlias 智能学习辅助系统开发记录',
    summary: '我的第一个完整后端项目：基于 Spring Boot 与 MyBatis 的管理系统，从增删改查到数据统计功能的实现过程。',
    content:
      'Tlias 是我完成的第一个比较完整的后端项目，主要技术栈是 JavaSE、Spring Boot、MySQL 和 MyBatis。\n\n核心功能：部门管理与员工管理的基础增删改查，包括分页查询、条件搜索、新增与修改。做完基础 CRUD 后，我又在原有基础上新增了数据统计功能，练习了多表关联查询与结果封装。\n\n踩过的坑：1）实体类字段与数据库下划线字段的映射问题，靠开启驼峰映射解决；2）分页查询一开始手写 LIMIT，后来换成了 PageHelper 插件；3）统一响应结果与全局异常处理让接口规范了很多。\n\n项目代码放在 GitHub 上。',
    tag: '后端',
    createdAt: '2026-11-06 20:00:00',
  },
  {
    id: 3,
    title: '苍穹外卖项目实践小结',
    summary: '跟完苍穹外卖项目后的复盘：管理端与客户端的功能实现，以及 Redis、WebSocket 等新技术的收获。',
    content:
      '10 月 25 日勉强把苍穹外卖跟完了，这是我目前接触过的规模最大的项目，前后端分离，包含管理端和客户端两套功能。\n\n新接触的技术：1）Redis 缓存，用来做营业状态与店铺数据的缓存，理解了缓存与数据库的一致性问题；2）WebSocket，实现来单提醒与催单的实时推送；3）PageHelper 完成动态分页；4）Nginx 反向代理与部署的基本用法。\n\n由于课比较多，整个项目跟得比较慢，部分功能有瑕疵。\n\n 个人感受：',
    tag: '后端',
    createdAt: '2026-11-03 19:00:00',
  },
  {
    id: 4,
    title: '从大一到大二：进度缓慢的学习路线',
    summary: '复盘从入学到现在的学习路径：跟着 B 站黑马程序员从 Java 入门，到完成第一个前后端分离项目。',
    content:
      '盘点一下入学以来的学习路线：绝大部分技术都是跟着 B 站黑马程序员的视频学会的。\n\n路径大致是：C 语言入门 → Java 面向对象基础 → 前端 JavaWeb → 跟项目实战（Tlias、苍穹外卖）。\n\n目前的状态：Java 最熟悉，C 次之，Python 和 C++ 仅入门；前端看得懂、会使用；算法刚起步，正在刷 Hot 100。\n\n接下来的计划：坚持每天 1-3 道算法题。',
    tag: '随笔',
    createdAt: '2026-11-01 10:00:00',
  },
]
