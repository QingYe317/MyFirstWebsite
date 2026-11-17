package com.example.personalsite;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// 启动类：扫描 mapper 包下的接口
@SpringBootApplication
@MapperScan("com.example.personalsite.mapper")
public class PersonalSiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(PersonalSiteApplication.class, args);
    }
}
