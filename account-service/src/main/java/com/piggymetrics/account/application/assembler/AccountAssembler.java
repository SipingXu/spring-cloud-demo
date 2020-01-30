package com.piggymetrics.account.application.assembler;

import com.piggymetrics.account.application.dto.AccountDTO;
import com.piggymetrics.account.domain.entity.Account;
import org.springframework.beans.BeanUtils;

public class AccountAssembler {
    public static Account convertToEntity(AccountDTO accountDTO) {
        if (accountDTO == null) {
            return null;
        }

        Account account = new Account();
        BeanUtils.copyProperties(accountDTO, account);

        return account;
    }

    public static AccountDTO convertToDTO(Account account) {
        if (account == null) {
            return null;
        }

        AccountDTO accountDTO = new AccountDTO();
        BeanUtils.copyProperties(account, accountDTO);

        return accountDTO;
    }
}
