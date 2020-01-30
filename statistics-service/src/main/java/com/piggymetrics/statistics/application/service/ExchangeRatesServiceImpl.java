package com.piggymetrics.statistics.application.service;

import com.google.common.collect.ImmutableMap;
import com.piggymetrics.statistics.application.client.ExchangeRatesClient;
import com.piggymetrics.statistics.domain.vo.Currency;
import com.piggymetrics.statistics.domain.vo.ExchangeRatesContainer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.Map;

@Service
@Slf4j
public class ExchangeRatesServiceImpl implements ExchangeRatesService {
    private ExchangeRatesContainer container;

    @Autowired
    private ExchangeRatesClient client;

    /**
     * {@inheritDoc}
     */
    @Override
    public Map<Currency, BigDecimal> getCurrentRates() {

        if (container == null || !container.getDate().equals(LocalDate.now())) {
            container = client.getRates(Currency.getBase());
            log.info("exchange rates has been updated: {}", container);
        }

        return ImmutableMap.of(
                Currency.EUR, container.getRates().get(Currency.EUR.name()),
                Currency.RUB, container.getRates().get(Currency.RUB.name()),
                Currency.USD, BigDecimal.ONE
        );
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public BigDecimal convert(Currency from, Currency to, BigDecimal amount) {

        Assert.notNull(amount, "empty amount is not allowed");

        Map<Currency, BigDecimal> rates = getCurrentRates();
        BigDecimal ratio = rates.get(to).divide(rates.get(from), 4, RoundingMode.HALF_UP);

        return amount.multiply(ratio);
    }
}
