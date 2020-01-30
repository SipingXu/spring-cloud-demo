package com.piggymetrics.notification.application.dto;

import com.piggymetrics.notification.domain.vo.NotificationSettings;
import com.piggymetrics.notification.domain.vo.NotificationType;
import lombok.Data;

import java.util.Map;

@Data
public class RecipientDTO {
    private String accountName;
    private String email;
    private Map<NotificationType, NotificationSettings> scheduledNotifications;
}
