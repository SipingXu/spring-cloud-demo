package com.piggymetrics.statistics.domain.entity;

import com.piggymetrics.statistics.domain.vo.DataPointId;
import com.piggymetrics.statistics.domain.vo.ItemMetric;
import com.piggymetrics.statistics.domain.vo.StatisticMetric;
import com.piggymetrics.statistics.domain.vo.Currency;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Set;

/**
 * Represents daily time series data point containing
 * current account state
 */
@Document(collection = "datapoints")
@Data
public class DataPoint {
    @Id
    private DataPointId id;

    private Set<ItemMetric> incomes;

    private Set<ItemMetric> expenses;

    private Map<StatisticMetric, BigDecimal> statistics;

    private Map<Currency, BigDecimal> rates;
}
