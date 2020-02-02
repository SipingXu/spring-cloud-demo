package com.piggymetrics.statistics.domain.entity;

import com.arangodb.springframework.annotation.Document;
import com.arangodb.springframework.annotation.HashIndex;
import com.piggymetrics.statistics.domain.vo.Currency;
import com.piggymetrics.statistics.domain.vo.DataPointId;
import com.piggymetrics.statistics.domain.vo.ItemMetric;
import com.piggymetrics.statistics.domain.vo.StatisticMetric;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Set;

/**
 * Represents daily time series data point containing
 * current account state
 */
@Data
@Document(collection = "datapoints")
@HashIndex(fields = { "id.account", "id.date" }, unique = true)
public class DataPoint {
    private DataPointId id;

    private Set<ItemMetric> incomes;

    private Set<ItemMetric> expenses;

    private Map<StatisticMetric, BigDecimal> statistics;

    private Map<Currency, BigDecimal> rates;
}
