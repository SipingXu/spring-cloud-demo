package com.piggymetrics.notification.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum NotificationType {

    BACKUP("backup.email.subject", "backup.email.text", "backup.email.attachment"),
    REMIND("remind.email.subject", "remind.email.text", null);

    @Getter
    private String subject;
    @Getter
    private String text;
    @Getter
    private String attachment;
}
