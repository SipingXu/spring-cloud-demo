package com.piggymetrics.auth.application.assembler;

import com.piggymetrics.auth.application.dto.UserDTO;
import com.piggymetrics.auth.domain.entity.User;
import org.springframework.beans.BeanUtils;

public class UserAssembler {
    public static User convertToEntity(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        }

        User user = new User();
        BeanUtils.copyProperties(userDTO, user);
        return user;
    }

    public static UserDTO convertToDto(User user) {
        if (user == null) {
            return null;
        }

        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(user, userDTO);
        return userDTO;
    }
}
