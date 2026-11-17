-- 真实数据：REPLACE INTO 按主键覆盖旧记录，后端每次启动都会更新为最新内容
-- 清理旧版本遗留数据（id 不在当前数据集内的记录）
DELETE FROM project WHERE id NOT IN (1, 2, 3);
DELETE FROM article WHERE id NOT IN (1, 2, 3, 4);

REPLACE INTO profile (id, name, title, avatar, bio, email, github, location, skills) VALUES
(1, 'QingYe', '计算机科学与技术专业 · 大二学生', '🧑‍💻',
 '热爱编程的大二学生，主攻 Java 后端开发，跟着实战课程一步步把想法变成代码，目标成为一名 Java 开发工程师。',
 '18270051397@163.com', 'https://github.com/QingYe317', '',
 'Java,Spring Boot,MyBatis,MySQL,Vue,HTML/CSS/JS,Git,Maven');

REPLACE INTO project (id, name, description, tech_stack, link, sort_order) VALUES
(1, 'Tlias 智能学习辅助系统', '基于 JavaSE、Spring Boot、MySQL 与 MyBatis 完成的后台管理项目，实现部门与员工管理的增删改查，并在此基础上新增了数据统计功能。', 'Java,Spring Boot,MyBatis,MySQL', 'https://github.com/QingYe317/tlias-web-management', 1),
(2, '苍穹外卖', '跟随实战课程完成的外卖项目，实现管理端与客户端功能开发，实践了 Redis 缓存、WebSocket 实时推送、PageHelper 分页等技术。', 'Spring Boot,Redis,WebSocket,MySQL,Vue', 'https://gitee.com/prior-people', 2),
(3, '个人网站', '你正在浏览的这个网站：Vue3 + Spring Boot 前后端分离搭建，用于展示个人作品与学习笔记，也是前端工程化的一次完整练习。', 'Vue3,Vue Router,Axios,Spring Boot,MySQL', 'https://github.com/QingYe317/MyFirstWebsite', 3);

REPLACE INTO article (id, title, summary, content, tag, created_at) VALUES
(1, 'LeetCode Hot 100 刷题进行时', '11 月 1 日开始刷 LeetCode Hot 100，每天保持 1-3 题，记录当前进度与刷题感受。', '11 月 1 日正式启动 LeetCode Hot 100 刷题计划，目标是把数据结构与算法基础补齐。\n\n当前进度：完成第 15 题，每天做 1-3 题。之前算法题做得不多，大一上学期做过一些，后面接触很少，现在算从头捡起来，还处于初级阶段。\n\n几天刷下来的感受：1）数组与双指针的套路性很强，理解模板后很多题都是变形；2）做完题不能直接看题解了事，隔天重写一遍印象更深；3）有些题一上手没思路很正常，先想暴力解再逐步优化。\n\n刷题节奏不求快，稳定坚持比突击更重要。计划每完成 25 题回来复盘一次。', '算法', '2026-11-10 21:30:00'),
(2, 'Tlias 智能学习辅助系统开发记录', '我的第一个完整后端项目：基于 Spring Boot 与 MyBatis 的管理系统，从增删改查到数据统计功能的实现过程。', 'Tlias 是我完成的第一个比较完整的后端项目，主要技术栈是 JavaSE、Spring Boot、MySQL 和 MyBatis。\n\n核心功能：部门管理与员工管理的基础增删改查，包括分页查询、条件搜索、新增与修改。做完基础 CRUD 后，我又在原有基础上新增了数据统计功能，练习了多表关联查询与结果封装。\n\n踩过的坑：1）实体类字段与数据库下划线字段的映射问题，靠开启驼峰映射解决；2）分页查询一开始手写 LIMIT，后来换成了 PageHelper 插件；3）统一响应结果与全局异常处理让接口规范了很多。\n\n项目代码放在 GitHub 上，回头准备把日志与参数校验的部分再完善一下。', '后端', '2026-11-06 20:00:00'),
(3, '苍穹外卖项目实践小结', '跟完苍穹外卖项目后的复盘：管理端与客户端的功能实现，以及 Redis、WebSocket 等新技术的收获。', '10 月 25 日勉强把苍穹外卖跟完了，这是我目前接触过的规模最大的项目，前后端分离，包含管理端和客户端两套功能。\n\n新接触的技术：1）Redis 缓存，用来做营业状态与店铺数据的缓存，理解了缓存与数据库的一致性问题；2）WebSocket，实现来单提醒与催单的实时推送；3）PageHelper 完成动态分页；4）Nginx 反向代理与部署的基本用法。\n\n由于课比较多，整个项目跟得比较慢，部分功能是压缩到周末完成的。后面计划把代码重新梳理一遍，重点理解微信支付与权限校验的实现思路。', '后端', '2026-11-03 19:00:00'),
(4, '从黑马视频到独立开发：我的学习路线', '复盘从入学到现在的学习路径：跟着 B 站黑马程序员从 Java 入门，到完成第一个前后端分离项目。', '盘点一下入学以来的学习路线：绝大部分技术都是跟着 B 站黑马程序员的视频学会的。\n\n路径大致是：C 语言入门 → Java 面向对象 → MySQL 与 JDBC → Maven 与 Git → Spring Boot 与 MyBatis → 前端 HTML/CSS/JS 与 Vue → 跟项目实战（Tlias、苍穹外卖）。\n\n目前的状态：Java 最熟悉，C 次之，Python 和 C++ 仅入门；前端看得懂、会使用；算法刚起步，正在刷 Hot 100。\n\n接下来的计划：坚持每天 1-3 道算法题，深入理解 Spring Boot 的原理，逐步做出属于自己的东西，而不只是跟课。', '随笔', '2026-11-01 10:00:00');
