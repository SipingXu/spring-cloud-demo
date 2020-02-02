package com.piggymetrics.auth.domain.repository;

import com.arangodb.springframework.repository.ArangoRepository;
import com.piggymetrics.auth.domain.entity.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends ArangoRepository<User, String> {

}
