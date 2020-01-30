package com.piggymetrics.account.application.service;

import com.piggymetrics.account.application.client.AuthServiceClient;
import com.piggymetrics.account.application.client.StatisticsServiceClient;
import com.piggymetrics.account.domain.entity.Account;
import com.piggymetrics.account.domain.repository.AccountRepository;
import com.piggymetrics.account.domain.vo.Currency;
import com.piggymetrics.account.domain.vo.Saving;
import com.piggymetrics.account.domain.vo.User;
import com.piggymetrics.account.application.assembler.AccountAssembler;
import com.piggymetrics.account.application.dto.AccountDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.math.BigDecimal;
import java.util.Date;

@Service
public class AccountServiceImpl implements AccountService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private StatisticsServiceClient statisticsClient;

    @Autowired
    private AuthServiceClient authClient;

    @Autowired
    private AccountRepository repository;

    /**
     * {@inheritDoc}
     */
    @Override
    public AccountDTO findByName(String accountName) {
        Assert.hasLength(accountName, "account name must not be empty");
        Account account = repository.findByName(accountName);
        return AccountAssembler.convertToDTO(account);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public AccountDTO create(User user) {

        Account existing = repository.findByName(user.getUsername());
        Assert.isNull(existing, "account already exists: " + user.getUsername());

        authClient.createUser(user);

        Saving saving = new Saving();
        saving.setAmount(new BigDecimal(0));
        saving.setCurrency(Currency.getDefault());
        saving.setInterest(new BigDecimal(0));
        saving.setDeposit(false);
        saving.setCapitalization(false);

        Account account = new Account();
        account.setName(user.getUsername());
        account.setLastSeen(new Date());
        account.setSaving(saving);

        repository.save(account);

        log.info("new account has been created: {}", account.getName());

        return AccountAssembler.convertToDTO(account);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void saveChanges(String name, AccountDTO update) {

        Account account = repository.findByName(name);
        Assert.notNull(account, "can't find account with name " + name);

        account.setIncomes(update.getIncomes());
        account.setExpenses(update.getExpenses());
        account.setSaving(update.getSaving());
        account.setNote(update.getNote());
        account.setLastSeen(new Date());
        repository.save(account);

        log.debug("account {} changes has been saved", name);

        statisticsClient.updateStatistics(name, account);
    }
}
