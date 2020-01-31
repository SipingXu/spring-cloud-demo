package com.piggymetrics.statistics;

import com.piggymetrics.statistics.domain.converter.DataPointIdReaderConverter;
import com.piggymetrics.statistics.domain.converter.DataPointIdWriterConverter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;

import java.util.Arrays;

@SpringBootApplication
@EnableDiscoveryClient
@EnableOAuth2Client
@EnableFeignClients
@EnableCircuitBreaker
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class StatisticsApplication {

    public static void main(String[] args) {
        SpringApplication.run(StatisticsApplication.class, args);
    }

    @Configuration
    static class CustomConversionsConfig {
        @Bean
        public MongoCustomConversions mongoCustomConversions() {
            return new MongoCustomConversions(Arrays.asList(new DataPointIdReaderConverter(),
                    new DataPointIdWriterConverter()));
        }
    }
}
