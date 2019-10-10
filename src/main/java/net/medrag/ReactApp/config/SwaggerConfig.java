package net.medrag.ReactApp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * {@author} Stanislav Tretyakov
 * 10.10.2019
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    private static final String VERSION = "1.0";
    private static final String LICENSE = "No License - in learning purposes";
    private static final String TITLE = "ReactApp REST API";
    private static final String DESCRIPTION = "REST API for ReactApp.";
    private static final String AUTHOR = "Stanislav Tretyakov";
    private static final String EMAIL = "Stanislav.Tretyakov@t-systems.com";
    private static final String URL = "https://vk.com/gaffstranger";

    @Bean
    public Docket productApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .pathMapping("/")
                .select()
                .apis(RequestHandlerSelectors.basePackage("net.medrag.ReactApp.controller"))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title(TITLE)
                .description(DESCRIPTION)
                .license(LICENSE)
                .version(VERSION)
                .contact(new Contact(AUTHOR, URL, EMAIL))
                .build();
    }
}
