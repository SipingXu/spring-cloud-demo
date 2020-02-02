package com.piggymetrics.notification.domain.vo;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class NotificationSettings {

    @NotNull
    private Boolean active;

    @NotNull
    private Frequency frequency;

    private long lastNotified;
}
