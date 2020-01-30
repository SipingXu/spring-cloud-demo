package com.piggymetrics.auth.domain.repository;

import com.piggymetrics.auth.domain.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, String> {

}
