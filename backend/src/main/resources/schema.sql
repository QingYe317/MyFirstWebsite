-- 建表脚本：使用 IF NOT EXISTS，重复启动不报错
CREATE TABLE IF NOT EXISTS profile (
    id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(50)  NOT NULL COMMENT '姓名',
    title    VARCHAR(100)          COMMENT '头衔/身份',
    avatar   VARCHAR(50)           COMMENT '头像（emoji）',
    bio      TEXT                  COMMENT '个人简介',
    email    VARCHAR(100)          COMMENT '邮箱',
    github   VARCHAR(200)          COMMENT 'GitHub 主页',
    location VARCHAR(100)          COMMENT '所在城市',
    skills   VARCHAR(500)          COMMENT '技能标签，逗号分隔'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS project (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL COMMENT '作品名称',
    description TEXT                  COMMENT '作品描述',
    tech_stack  VARCHAR(300)          COMMENT '技术栈，逗号分隔',
    link        VARCHAR(300)          COMMENT '作品链接',
    sort_order  INT DEFAULT 0         COMMENT '排序号，越小越靠前'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS article (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    title      VARCHAR(200) NOT NULL COMMENT '文章标题',
    summary    VARCHAR(500)          COMMENT '摘要',
    content    TEXT                  COMMENT '正文',
    tag        VARCHAR(50)           COMMENT '标签',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
