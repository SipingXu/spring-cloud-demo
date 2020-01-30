package com.piggymetrics.account.application.service;

import com.piggymetrics.account.domain.vo.User;
import com.piggymetrics.account.application.dto.AccountDTO;

public interface AccountService {

    /**
     * Finds account by given name
     *
     * @param accountName
     * @return found account
     */
    AccountDTO findByName(String accountName);

    /**
     * Checks if account with the same name already exists
     * Invokes Auth Service user creation
     * Creates new account with default parameters
     *
     * @param user
     * @return created account
     */
    AccountDTO create(User user);

    /**
     * Validates and applies incoming account updates
     * Invokes Statistics Service update
     *
     * @param name
     * @param update
     */
    void saveChanges(String name, AccountDTO update);
}
