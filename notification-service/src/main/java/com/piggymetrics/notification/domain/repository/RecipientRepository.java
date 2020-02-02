package com.piggymetrics.notification.domain.repository;

import com.arangodb.springframework.annotation.Query;
import com.arangodb.springframework.repository.ArangoRepository;
import com.piggymetrics.notification.domain.entity.Recipient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipientRepository extends ArangoRepository<Recipient, String> {

    Recipient findByAccountName(String name);

//    @Query("{ $and: [ {'scheduledNotifications.BACKUP.active': true }, { $where: 'this.scheduledNotifications.BACKUP.lastNotified < " +
//            "new Date(new Date().setDate(new Date().getDate() - this.scheduledNotifications.BACKUP.frequency ))' }] }")

    @Query("FOR doc IN recipients \n" +
            "filter doc.scheduledNotifications.BACKUP.active == true \n" +
            "AND doc.scheduledNotifications.BACKUP.lastNotified < DATE_NOW() - doc.scheduledNotifications.BACKUP.frequency \n" +
            "RETURN doc")
    List<Recipient> findReadyForBackup();

//    @Query("{ $and: [ {'scheduledNotifications.REMIND.active': true }, { $where: 'this.scheduledNotifications.REMIND.lastNotified < " +
//            "new Date(new Date().setDate(new Date().getDate() - this.scheduledNotifications.REMIND.frequency ))' }] }")
    @Query("FOR doc IN recipients \n" +
            "filter doc.scheduledNotifications.REMIND.active == true \n" +
            "AND doc.scheduledNotifications.REMIND.lastNotified < DATE_NOW() - doc.scheduledNotifications.REMIND.frequency \n" +
            "RETURN doc")
    List<Recipient> findReadyForRemind();

}
