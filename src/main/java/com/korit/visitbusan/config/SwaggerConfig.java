package com.korit.visitbusan.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.korit.visitbusan.web.api"))
                .paths(PathSelectors.any()) // basePackage로부터 Mapping된 resource를 문서화 시킴
                .build();
    }
    private ApiInfo apiInfo(){
        return new ApiInfoBuilder()
                .title("Visit Busan API Documentation")
                .description("This documents describes about Visit-Busan project RestAPI ")
                .version("1.0.0")
                .build();
    }
}