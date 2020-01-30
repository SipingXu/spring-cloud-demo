package com.piggymetrics.account.application.client;

import com.piggymetrics.account.domain.entity.Account;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/**
 * @author cdov
 */
@Slf4j
@Component
public class StatisticsServiceClientFallback implements StatisticsServiceClient {
    @Override
    public void updateStatistics(String accountName, Account account) {
        log.error("Error during update statistics for account: {}", accountName);
    }
}
