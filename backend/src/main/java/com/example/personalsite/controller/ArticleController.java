package com.example.personalsite.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.personalsite.common.Result;
import com.example.personalsite.entity.Article;
import com.example.personalsite.mapper.ArticleMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// 文章接口
@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleMapper articleMapper;

    public ArticleController(ArticleMapper articleMapper) {
        this.articleMapper = articleMapper;
    }

    // GET /api/articles：按发布时间倒序排列
    @GetMapping
    public Result<List<Article>> list() {
        List<Article> articles = articleMapper.selectList(
                new LambdaQueryWrapper<Article>().orderByDesc(Article::getCreatedAt));
        return Result.ok(articles);
    }

    // GET /api/articles/{id}：文章详情
    @GetMapping("/{id}")
    public Result<Article> detail(@PathVariable Long id) {
        Article article = articleMapper.selectById(id);
        if (article == null) {
            return Result.error(404, "文章不存在");
        }
        return Result.ok(article);
    }
}
