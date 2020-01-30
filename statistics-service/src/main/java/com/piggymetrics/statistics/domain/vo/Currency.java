package com.piggymetrics.statistics.domain.vo;

public enum Currency {
    USD, EUR, RUB;

    public static Currency getBase() {
        return USD;
    }
}
