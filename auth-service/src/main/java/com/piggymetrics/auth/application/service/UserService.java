package com.piggymetrics.auth.application.service;

import com.piggymetrics.auth.application.dto.UserDTO;
import com.piggymetrics.auth.domain.entity.User;

public interface UserService {

    User create(UserDTO userDTO);

}
