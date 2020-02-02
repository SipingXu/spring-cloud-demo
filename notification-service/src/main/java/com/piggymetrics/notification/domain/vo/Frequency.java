package com.piggymetrics.notification.domain.vo;

import lombok.AllArgsConstructor;
import org.codehaus.jackson.annotate.JsonValue;

import java.util.stream.Stream;

@AllArgsConstructor
public enum Frequency {

    WEEKLY(7), MONTHLY(30), QUARTERLY(90);

    private int days;

    @JsonValue
    public int getDays() {
        return this.days;
    }

    public static Frequency withDays(int days) {
        return Stream.of(Frequency.values())
                .filter(f -> f.getDays() == days)
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
