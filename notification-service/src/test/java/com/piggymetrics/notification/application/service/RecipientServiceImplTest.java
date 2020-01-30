package com.piggymetrics.notification.application.service;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import com.piggymetrics.notification.application.dto.RecipientDTO;
import com.piggymetrics.notification.domain.vo.Frequency;
import com.piggymetrics.notification.domain.vo.NotificationSettings;
import com.piggymetrics.notification.domain.vo.NotificationType;
import com.piggymetrics.notification.domain.entity.Recipient;
import com.piggymetrics.notification.domain.repository.RecipientRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class RecipientServiceImplTest {

    @InjectMocks
    private RecipientServiceImpl recipientService;

    @Mock
    private RecipientRepository repository;

    @Before
    public void setup() {
        initMocks(this);
    }

    @Test
    public void shouldFindByAccountName() {
        Recipient recipient = new Recipient();
        recipient.setAccountName("test");

        when(repository.findByAccountName(recipient.getAccountName())).thenReturn(recipient);
        Recipient found = recipientService.findByAccountName(recipient.getAccountName());

        assertEquals(recipient, found);
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldFailToFindRecipientWhenAccountNameIsEmpty() {
        recipientService.findByAccountName("");
    }

    @Test
    public void shouldSaveRecipient() {

        NotificationSettings remind = new NotificationSettings();
        remind.setActive(true);
        remind.setFrequency(Frequency.WEEKLY);
        remind.setLastNotified(null);

        NotificationSettings backup = new NotificationSettings();
        backup.setActive(false);
        backup.setFrequency(Frequency.MONTHLY);
        backup.setLastNotified(new Date());

        RecipientDTO recipientDTO = new RecipientDTO();
        recipientDTO.setEmail("test@test.com");
        recipientDTO.setScheduledNotifications(ImmutableMap.of(
                NotificationType.BACKUP, backup,
                NotificationType.REMIND, remind
        ));

        Recipient saved = recipientService.save("test", recipientDTO);

        verify(repository).save(saved);
        assertNotNull(saved.getScheduledNotifications().get(NotificationType.REMIND).getLastNotified());
        assertEquals("test", saved.getAccountName());
    }

    @Test
    public void shouldFindReadyToNotifyWhenNotificationTypeIsBackup() {
        final List<Recipient> recipients = ImmutableList.of(new Recipient());
        when(repository.findReadyForBackup()).thenReturn(recipients);

        List<Recipient> found = recipientService.findReadyToNotify(NotificationType.BACKUP);
        assertEquals(recipients, found);
    }

    @Test
    public void shouldFindReadyToNotifyWhenNotificationTypeIsRemind() {
        final List<Recipient> recipients = ImmutableList.of(new Recipient());
        when(repository.findReadyForRemind()).thenReturn(recipients);

        List<Recipient> found = recipientService.findReadyToNotify(NotificationType.REMIND);
        assertEquals(recipients, found);
    }

    @Test
    public void shouldMarkAsNotified() {

        NotificationSettings remind = new NotificationSettings();
        remind.setActive(true);
        remind.setFrequency(Frequency.WEEKLY);
        remind.setLastNotified(null);

        Recipient recipient = new Recipient();
        recipient.setAccountName("test");
        recipient.setEmail("test@test.com");
        recipient.setScheduledNotifications(ImmutableMap.of(
                NotificationType.REMIND, remind
        ));

        recipientService.markNotified(NotificationType.REMIND, recipient);
        assertNotNull(recipient.getScheduledNotifications().get(NotificationType.REMIND).getLastNotified());
        verify(repository).save(recipient);
    }
}