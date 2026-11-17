package com.example.personalsite.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.personalsite.common.Result;
import com.example.personalsite.entity.Project;
import com.example.personalsite.mapper.ProjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// 作品接口
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectMapper projectMapper;

    public ProjectController(ProjectMapper projectMapper) {
        this.projectMapper = projectMapper;
    }

    // GET /api/projects：按 sort_order 升序排列
    @GetMapping
    public Result<List<Project>> list() {
        List<Project> projects = projectMapper.selectList(
                new LambdaQueryWrapper<Project>().orderByAsc(Project::getSortOrder));
        return Result.ok(projects);
    }
}
