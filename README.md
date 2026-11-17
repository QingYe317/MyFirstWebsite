# 个人网站（Web 课程作业）

一个基于 **Vue3 + SpringBoot 前后端分离**的个人展示网站骨架，包含首页、作品列表、博客列表、文章详情、关于我五个页面，响应式布局适配手机端。

## 技术栈

| 层 | 技术 |
|---|---|
| 前端 | Vue3 + Vite + Vue Router + Axios，原生 CSS |
| 后端 | SpringBoot 3.3.5 + Java 17 + MyBatis-Plus 3.5.7 |
| 数据库 | MySQL 8，库名 `personal_site` |
| 端口 | 前端 5173，后端 8080 |

## 目录结构

```
personal-site/
├── README.md                  # 本文件
├── 演示检查清单.md             # 答辩/提交前逐项验证清单
├── backend/                   # 后端（用 IDEA 打开这个目录）
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/example/personalsite/
│       │   ├── PersonalSiteApplication.java   # 启动类
│       │   ├── common/Result.java             # 统一返回 { code, message, data }
│       │   ├── config/WebConfig.java          # CORS 配置
│       │   ├── controller/                    # 三个 REST 控制器
│       │   ├── entity/                        # Profile / Project / Article
│       │   └── mapper/                        # MyBatis-Plus Mapper
│       └── resources/
│           ├── application.yml                # 数据源与 SQL 自动初始化配置
│           ├── schema.sql                     # 建表脚本（幂等）
│           └── data.sql                       # 示例数据（INSERT IGNORE 幂等）
└── frontend/                  # 前端
    ├── package.json
    ├── vite.config.js         # /api 代理到 http://localhost:8080
    └── src/
        ├── main.js / App.vue / style.css
        ├── router/index.js    # 5 个页面路由
        ├── api/index.js       # 请求封装，失败自动切兜底数据
        ├── data/fallback.js   # 兜底示例数据
        ├── components/        # NavBar（含汉堡菜单）/ Footer
        └── views/             # 5 个页面组件
```

## 数据库创建步骤

只需创建数据库，建表和插数据由后端启动时自动完成：

```sql
CREATE DATABASE personal_site DEFAULT CHARACTER SET utf8mb4;
```

## 启动后端（二选一）

### 方式一：IntelliJ IDEA

1. IDEA 中 `File → Open`，选择 `backend` 目录打开
2. 确认 Project SDK 为 JDK 17（`File → Project Structure → Project`；若未安装 JDK 17，可在 SDK 列表 → `Add SDK → Download JDK` 中直接下载 Temurin 17）
3. 等待 Maven 依赖下载完成
4. 运行 `PersonalSiteApplication` 主类
5. 看到 `Tomcat started on port 8080` 即启动成功

### 方式二：命令行 Maven

要求 `JAVA_HOME` 指向 JDK 17 且 `mvn` 已加入 PATH：

```bash
cd backend
mvn spring-boot:run
```

## 启动前端

```bash
cd frontend
npm install
npm run dev
```

浏览器打开 <http://localhost:5173> 即可看到页面。

> 特性：即使**只启动前端**（不启动后端和 MySQL），页面也会自动使用内置兜底数据，完整可看，不会白屏。

## 后端接口

| 接口 | 说明 |
|---|---|
| GET /api/profile | 个人信息 |
| GET /api/projects | 作品列表（按 sort_order 升序） |
| GET /api/articles | 文章列表（按时间倒序） |
| GET /api/articles/{id} | 文章详情 |

统一返回结构：`{ "code": 200, "message": "success", "data": ... }`

## 常见问题

1. **后端启动报数据库连接失败**：确认 MySQL 已启动、`personal_site` 库已创建、application.yml 中密码与你的 root 密码（默认 1234）一致。
2. **端口被占用**：后端改 `application.yml` 的 `server.port`，前端改 `vite.config.js` 的 `server.port`（代理 target 也要同步改）。
3. **页面显示的是示例数据**：说明后端未启动或接口请求失败，属正常兜底行为；启动后端并刷新页面即可切换为数据库真实数据。
4. **npm install 很慢**：可切换国内镜像：`npm config set registry https://registry.npmmirror.com`。
5. **mvn 命令找不到**：本机 Maven 安装在 `C:\develop\1.Java\apache-maven-3.9.16`（未加入 PATH），命令行启动方式：

   ```cmd
   set JAVA_HOME=C:\develop\1.Java\jdk-17
   C:\develop\1.Java\apache-maven-3.9.16\bin\mvn.cmd spring-boot:run
   ```

   日常开发推荐直接用 IDEA 方式启动。
6. **启动报 NoClassDefFoundError: SpringApplication（中文用户名电脑）**：已通过 `C:\Users\橙子\.m2\settings.xml` 将 Maven 本地仓库迁至 `C:\develop\1.Java\maven-repo` 解决，请勿删除该配置文件；同理 `application.yml` 中 `spring.sql.init.encoding: utf-8` 解决了示例数据中文乱码，请勿删除。

## 后续扩展点

- 文章 Markdown 渲染（引入 markdown-it）
- 后台管理界面（文章/作品的增删改）
- 图片上传（作品封面、头像）
- 登录鉴权（Spring Security 或 JWT）
- 评论功能、归档页面、暗色主题
