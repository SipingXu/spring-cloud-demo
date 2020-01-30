package com.piggymetrics.statistics.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

/**
 * Represents normalized {@link Item} object
 * with {@link Currency#getBase()} currency and {@link TimePeriod#getBase()} time period
 */
@AllArgsConstructor
public class ItemMetric {
    @Getter
    private String title;
    @Getter
    private BigDecimal amount;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ItemMetric that = (ItemMetric) o;

        return title.equalsIgnoreCase(that.title);

    }

    @Override
    public int hashCode() {
        return title.hashCode();
    }
}
