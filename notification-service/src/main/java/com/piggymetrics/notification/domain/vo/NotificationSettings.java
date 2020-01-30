package com.piggymetrics.notification.domain.vo;

import com.piggymetrics.notification.domain.vo.Frequency;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
public class NotificationSettings {

    @NotNull
    private Boolean active;

    @NotNull
    private Frequency frequency;

    private Date lastNotified;
}
