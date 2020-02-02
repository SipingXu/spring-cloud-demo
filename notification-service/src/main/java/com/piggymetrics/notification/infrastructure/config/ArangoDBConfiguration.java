package com.piggymetrics.notification.infrastructure.config;

import com.arangodb.ArangoDB;
import com.arangodb.springframework.annotation.EnableArangoRepositories;
import com.arangodb.springframework.config.ArangoConfiguration;
import com.piggymetrics.notification.domain.converter.FrequencyReaderConverter;
import com.piggymetrics.notification.domain.converter.FrequencyWriterConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.util.Pair;

import java.util.Arrays;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Configuration
@ConfigurationProperties(prefix = "spring.data.arangodb")
@EnableArangoRepositories(basePackages = {"com.piggymetrics.notification"})
public class ArangoDBConfiguration implements ArangoConfiguration {
    private final Pattern hostPortPattern = Pattern.compile("(\\w+):(\\d+)");

    @Value("${spring.data.arangodb.hosts}")
    private String hosts = "localhost:8529";

    @Value("${spring.data.arangodb.user}")
    private String user;

    @Value("${spring.data.arangodb.password}")
    private String password;

    @Value("${spring.data.arangodb.database}")
    private String database;

    @Override
    public ArangoDB.Builder arango() {
        ArangoDB.Builder builder = new ArangoDB.Builder();
        getHostPortPairList().forEach(hostPortPair -> builder.host(hostPortPair.getFirst(), hostPortPair.getSecond()));
        builder.user(user).password(password);
        return builder;
    }

    @Override
    public String database() {
        return database;
    }

    private List<Pair<String, Integer>> getHostPortPairList() {
        List<Pair<String, Integer>> hostPairList = new LinkedList<>();
        Arrays.stream(hosts.split(",")).forEach(hostPort -> {
            Matcher matcher = hostPortPattern.matcher(hostPort);
            if (matcher.find()) {
                hostPairList.add(Pair.of(matcher.group(1), Integer.parseInt(matcher.group(2))));
            }
        });
        return hostPairList;
    }

    @Override
    public Collection<Converter<?, ?>> customConverters() {
        return Arrays.asList(new FrequencyWriterConverter(), new FrequencyReaderConverter());
    }
}
