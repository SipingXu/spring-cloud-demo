package com.piggymetrics.notification.application.service;

import com.piggymetrics.notification.application.assembler.RecipientAssembler;
import com.piggymetrics.notification.application.dto.RecipientDTO;
import com.piggymetrics.notification.domain.vo.NotificationType;
import com.piggymetrics.notification.domain.entity.Recipient;
import com.piggymetrics.notification.domain.repository.RecipientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Date;
import java.util.List;

@Service
public class RecipientServiceImpl implements RecipientService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private RecipientRepository repository;

    @Override
    public Recipient findByAccountName(String accountName) {
        Assert.hasLength(accountName, "[Assertion failed] - this String argument must have length; it must not be null or empty");
        return repository.findByAccountName(accountName);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Recipient save(String accountName, RecipientDTO recipientDTO) {

        Recipient recipient = RecipientAssembler.convertToEntity(recipientDTO);
        recipient.setAccountName(accountName);
        recipient.getScheduledNotifications().values()
                .forEach(settings -> {
                    if (settings.getLastNotified() == 0) {
                        settings.setLastNotified(new Date().getTime());
                    }
                });

        repository.save(recipient);

        log.info("recipient {} settings has been updated", recipient);

        return recipient;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Recipient> findReadyToNotify(NotificationType type) {
        switch (type) {
            case BACKUP:
                return repository.findReadyForBackup();
            case REMIND:
                return repository.findReadyForRemind();
            default:
                throw new IllegalArgumentException();
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void markNotified(NotificationType type, Recipient recipient) {
        recipient.getScheduledNotifications().get(type).setLastNotified(new Date().getTime());
        repository.save(recipient);
    }
}
