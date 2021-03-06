package com.piggymetrics.account.facade.controller;

import com.piggymetrics.account.application.dto.AccountDTO;
import com.piggymetrics.account.application.service.AccountService;
import com.piggymetrics.account.domain.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PreAuthorize("#oauth2.hasScope('server') or #name.equals('demo')")
    @GetMapping(path = "/{name}")
    public AccountDTO getAccountByName(@PathVariable String name) {
        return accountService.findByName(name);
    }

    @GetMapping(path = "/current")
    public AccountDTO getCurrentAccount(Principal principal) {
        return accountService.findByName(principal.getName());
    }

    @PutMapping(path = "/current")
    public void saveCurrentAccount(Principal principal, @Valid @RequestBody AccountDTO accountDTO) {
        accountService.saveChanges(principal.getName(), accountDTO);
    }

    @PostMapping(path = "/")
    public AccountDTO createNewAccount(@Valid @RequestBody User user) {
        return accountService.create(user);
    }
}
