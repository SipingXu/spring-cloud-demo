package com.piggymetrics.notification.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.stream.Stream;

@AllArgsConstructor
public enum Frequency {

    WEEKLY(7), MONTHLY(30), QUARTERLY(90);

    @Getter
    private int days;

    public static Frequency withDays(int days) {
        return Stream.of(Frequency.values())
                .filter(f -> f.getDays() == days)
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
