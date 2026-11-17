package com.example.personalsite.controller;

import com.example.personalsite.common.Result;
import com.example.personalsite.entity.Profile;
import com.example.personalsite.mapper.ProfileMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// 个人信息接口
@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileMapper profileMapper;

    public ProfileController(ProfileMapper profileMapper) {
        this.profileMapper = profileMapper;
    }

    // GET /api/profile：返回 id 为 1 的个人信息
    @GetMapping
    public Result<Profile> getProfile() {
        return Result.ok(profileMapper.selectById(1L));
    }
}
