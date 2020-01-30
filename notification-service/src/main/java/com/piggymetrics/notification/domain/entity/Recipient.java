package com.piggymetrics.notification.domain.entity;

import com.piggymetrics.notification.domain.vo.NotificationSettings;
import com.piggymetrics.notification.domain.vo.NotificationType;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.Map;

@Data
@ToString
@Document(collection = "recipients")
public class Recipient {

    @Id
    private String accountName;

    @NotNull
    @Email
    private String email;

    @Valid
    private Map<NotificationType, NotificationSettings> scheduledNotifications;
}
