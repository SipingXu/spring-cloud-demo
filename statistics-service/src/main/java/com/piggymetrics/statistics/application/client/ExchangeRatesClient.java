package com.piggymetrics.statistics.application.client;

import com.piggymetrics.statistics.domain.vo.Currency;
import com.piggymetrics.statistics.domain.vo.ExchangeRatesContainer;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(url = "${rates.url}", name = "rates-client", fallback = ExchangeRatesClientFallback.class)
public interface ExchangeRatesClient {
    @GetMapping(value = "/latest")
    ExchangeRatesContainer getRates(@RequestParam("base") Currency base);
}