package com.piggymetrics.statistics.application.service;

import com.piggymetrics.statistics.domain.vo.Account;
import com.piggymetrics.statistics.domain.entity.DataPoint;

import java.util.List;

public interface StatisticsService {

    /**
     * Finds account by given name
     *
     * @param accountName
     * @return found account
     */
    List<DataPoint> findByAccountName(String accountName);

    /**
     * Converts given {@link Account} object to {@link DataPoint} with
     * a set of significant statistic metrics.
     * <p>
     * Compound {@link DataPoint#id} forces to rewrite the object
     * for each account within a day.
     *
     * @param accountName
     * @param account
     */
    DataPoint save(String accountName, Account account);

}
