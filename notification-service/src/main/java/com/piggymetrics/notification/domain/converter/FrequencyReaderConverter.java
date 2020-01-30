package com.piggymetrics.notification.domain.converter;

import com.piggymetrics.notification.domain.vo.Frequency;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNullApi;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;

@Component
public class FrequencyReaderConverter implements Converter<Integer, Frequency> {

    @Override
    public Frequency convert(Integer days) {
        return Frequency.withDays(days);
    }
}
