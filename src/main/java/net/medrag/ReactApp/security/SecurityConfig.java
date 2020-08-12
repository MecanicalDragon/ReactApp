package net.medrag.ReactApp.security;

import net.medrag.ReactApp.jwt.JwtAuthenticationEntryPoint;
import net.medrag.ReactApp.jwt.JwtAuthenticationFilter;
import net.medrag.ReactApp.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * {@author} Stanislav Tretyakov
 * 27.09.2019
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private static final String[] AUTH = {"/", "/auth/**", "/login/**", "/denied/**"};
    private static final String[] SWAGGER = {"/swagger-resources/**", "/swagger-ui.html", "/v2/api-docs", "/webjars/**"};
    private static final String[] ACTUATOR = {"/actuator/info", "/actuator/health"};
    private static final String[] USER_PAGES = {"/page1/**", "/page2/**"};
    private static final String[] ADMIN_PAGES = {"/page3/**", "/dnd"};
    private static final String[] RESOURCES = {"/", "/**/*.woff", "/**/*.ttf", "/favicon.ico", "/**/*.png", "/**/*.gif",
            "/**/*.svg", "/**/*.jpg", "/**/*.html", "/**/*.css", "/**/*.js"};

    @Bean
    public JwtTokenProvider jwtTokenProvider() {
        return new JwtTokenProvider();
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(udService())
                .passwordEncoder(passwordEncoder());
    }

    private UDService udService() {
        return new UDService();
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable()
                .exceptionHandling()
//                .authenticationEntryPoint(unauthorizedHandler())
//                .and()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .authorizeRequests()
//                .antMatchers(HttpMethod.OPTIONS).permitAll()
//                .antMatchers(AUTH).permitAll()
//                .antMatchers(RESOURCES).permitAll()
//                .antMatchers(ADMIN_PAGES).hasRole("ROLE_ADMIN")
//                .antMatchers(USER_PAGES).hasAnyRole("ROLE_USER","ROLE_ADMIN")
//                .anyRequest().authenticated()
                  ;

//        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration().applyPermitDefaultValues();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}

