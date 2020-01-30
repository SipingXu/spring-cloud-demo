package com.piggymetrics.notification.application.service;

import com.piggymetrics.notification.domain.vo.NotificationType;
import com.piggymetrics.notification.domain.entity.Recipient;

import javax.mail.MessagingException;
import java.io.IOException;

public interface EmailService {

    void send(NotificationType type, Recipient recipient, String attachment) throws MessagingException, IOException;

}
