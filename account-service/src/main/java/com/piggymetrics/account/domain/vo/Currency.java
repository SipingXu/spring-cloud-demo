package com.piggymetrics.account.domain.vo;

public enum Currency {

    USD, EUR, RUB;

    public static Currency getDefault() {
        return USD;
    }
}
