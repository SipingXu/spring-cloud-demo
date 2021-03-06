package com.piggymetrics.notification.facade.controller;

import com.piggymetrics.notification.application.dto.RecipientDTO;
import com.piggymetrics.notification.application.service.RecipientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/recipients")
public class RecipientController {

    @Autowired
    private RecipientService recipientService;

    @GetMapping(path = "/current")
    public Object getCurrentNotificationsSettings(Principal principal) {
        return recipientService.findByAccountName(principal.getName());
    }

    @PutMapping(path = "/current")
    public Object saveCurrentNotificationsSettings(Principal principal, @Valid @RequestBody RecipientDTO recipientDTO) {
        return recipientService.save(principal.getName(), recipientDTO);
    }
}
