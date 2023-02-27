package com.korit.visitbusan.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${file.path}")
    private String filePath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        WebMvcConfigurer.super.addResourceHandlers(registry);
        registry.addResourceHandler("/image/**") //image/**라는 요청이들어오면
                .addResourceLocations("file:///" + filePath) //file:///filePath경로를 참조하라는 뜻
                .resourceChain(true) //Chain은 필터처럼 위 내용을 아래의 PathResourceResolver 검사할건지 여부.
                .addResolver(new PathResourceResolver() { //여기서 resource는 자원으로써 URI의 뒷부분을 말한다.
                    @Override //경로에 한글이 들어갈때, 웹에서 한글을 인코딩해서 보내면 서버에서 읽을수 없기 때문에 아래처럼 디코딩 진행.
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        resourcePath = URLDecoder.decode(resourcePath, StandardCharsets.UTF_8);
                        return super.getResource(resourcePath, location);
                    }
                }); //우리의 upload이미지 경로는 프로젝트 안에 없다. 그폴더를 resolve할것인지 여부. - PathResourceResolver()
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods("*").allowedOrigins("*");
    }
}
