package com.piggymetrics.notification.application.assembler;

import com.piggymetrics.notification.application.dto.RecipientDTO;
import com.piggymetrics.notification.domain.entity.Recipient;
import org.springframework.beans.BeanUtils;

public class RecipientAssembler {
    public static Recipient convertToEntity(RecipientDTO recipientDTO) {
        Recipient recipient = new Recipient();
        BeanUtils.copyProperties(recipientDTO, recipient);
        return recipient;
    }

    public static RecipientDTO convertToDTO(Recipient recipient) {
        RecipientDTO recipientDTO = new RecipientDTO();
        BeanUtils.copyProperties(recipient, recipientDTO);
        return recipientDTO;
    }
}
