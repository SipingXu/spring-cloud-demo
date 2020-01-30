package com.piggymetrics.auth.application.service;

import com.piggymetrics.auth.application.assembler.UserAssembler;
import com.piggymetrics.auth.application.dto.UserDTO;
import com.piggymetrics.auth.domain.entity.User;
import com.piggymetrics.auth.domain.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final Logger log = LoggerFactory.getLogger(getClass());
    @Autowired
    private UserRepository repository;

    @Override
    public User create(UserDTO userDTO) {

        Optional<User> existing = repository.findById(userDTO.getUsername());
        existing.ifPresent(it -> {
            throw new IllegalArgumentException("user already exists: " + it.getUsername());
        });

        String hash = encoder.encode(userDTO.getPassword());
        userDTO.setPassword(hash);

        User user = UserAssembler.convertToEntity(userDTO);

        repository.save(user);

        log.info("new user has been created: {}", user.getUsername());

        return user;
    }
}
