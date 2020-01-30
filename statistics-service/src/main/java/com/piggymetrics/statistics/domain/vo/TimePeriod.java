package com.piggymetrics.statistics.domain.vo;

import lombok.AllArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
public enum TimePeriod {

    YEAR(365.2425), QUARTER(91.3106), MONTH(30.4368), DAY(1), HOUR(0.0416);

    private double baseRatio;

    public static TimePeriod getBase() {
        return DAY;
    }

    public BigDecimal getBaseRatio() {
        return BigDecimal.valueOf(baseRatio);
    }
}
