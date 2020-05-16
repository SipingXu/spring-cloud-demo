package com.piggymetrics.auth.application.security;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;

/**
 * @author cdov
 */
@Configuration
@EnableAuthorizationServer
public class OAuth2AuthorizationConfig extends AuthorizationServerConfigurerAdapter {

    private TokenStore tokenStore = new InMemoryTokenStore();
    @Autowired
    @Qualifier("authenticationManagerBean")
    private AuthenticationManager authenticationManager;

    @Autowired
    private MongoUserDetailsService userDetailsService;

    @Autowired
    private Environment env;

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        // @formatter:off
        clients.inMemory()
                .withClient("browser")
                .authorizedGrantTypes(AuthGrantType.REFRESH_TOKEN.getType(), AuthGrantType.PASSWORD.getType())
                .scopes(AuthScope.UI.getScope())
                .and()
                .withClient("account-service")
                .secret(env.getProperty("ACCOUNT_SERVICE_PASSWORD"))
                .authorizedGrantTypes(AuthGrantType.AUTHORIZATION_CODE.getType(), AuthGrantType.REFRESH_TOKEN.getType())
                .scopes(AuthScope.SERVER.getScope())
                .and()
                .withClient("statistics-service")
                .secret(env.getProperty("STATISTICS_SERVICE_PASSWORD"))
                .authorizedGrantTypes(AuthGrantType.AUTHORIZATION_CODE.getType(), AuthGrantType.REFRESH_TOKEN.getType())
                .scopes(AuthScope.SERVER.getScope())
                .and()
                .withClient("notification-service")
                .secret(env.getProperty("NOTIFICATION_SERVICE_PASSWORD"))
                .authorizedGrantTypes(AuthGrantType.AUTHORIZATION_CODE.getType(), AuthGrantType.REFRESH_TOKEN.getType())
                .scopes(AuthScope.SERVER.getScope());
        // @formatter:on
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        endpoints
                .tokenStore(tokenStore)
                .authenticationManager(authenticationManager)
                .userDetailsService(userDetailsService);
    }

    @Override
    public void configure(AuthorizationServerSecurityConfigurer oauthServer) throws Exception {
        oauthServer
                .tokenKeyAccess("permitAll()")
                .checkTokenAccess("isAuthenticated()")
                .passwordEncoder(new BCryptPasswordEncoder());
    }

}

@AllArgsConstructor
enum AuthGrantType {
    PASSWORD("password"),
    REFRESH_TOKEN("refresh_token"),
    AUTHORIZATION_CODE("authorization_code");

    @Getter
    private String type;
}

@AllArgsConstructor
enum AuthScope {
    UI("ui"),
    SERVER("server");

    @Getter
    private String scope;
}