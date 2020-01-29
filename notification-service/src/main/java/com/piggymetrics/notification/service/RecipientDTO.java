package com.piggymetrics.notification.service;

import com.piggymetrics.notification.domain.NotificationSettings;
import com.piggymetrics.notification.domain.NotificationType;
import lombok.Data;

import java.util.Map;

@Data
public class RecipientDTO {
    private String accountName;
    private String email;
    private Map<NotificationType, NotificationSettings> scheduledNotifications;
}
