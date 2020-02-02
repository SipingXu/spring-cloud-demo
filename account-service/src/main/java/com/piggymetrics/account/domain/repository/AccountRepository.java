package com.piggymetrics.account.domain.repository;

import com.arangodb.springframework.repository.ArangoRepository;
import com.piggymetrics.account.domain.entity.Account;

public interface AccountRepository extends ArangoRepository<Account, String> {

    Account findByName(String name);

}
