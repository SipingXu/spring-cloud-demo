package com.piggymetrics.statistics.domain.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true, value = {"date"})
@ToString
@Data
public class ExchangeRatesContainer {
    private LocalDate date = LocalDate.now();

    private Currency base;

    private Map<String, BigDecimal> rates;
}
