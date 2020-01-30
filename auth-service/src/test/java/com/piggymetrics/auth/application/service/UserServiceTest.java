package com.piggymetrics.auth.application.service;

import com.piggymetrics.auth.application.assembler.UserAssembler;
import com.piggymetrics.auth.application.dto.UserDTO;
import com.piggymetrics.auth.domain.entity.User;
import com.piggymetrics.auth.domain.repository.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

public class UserServiceTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository repository;

    @Before
    public void setup() {
        initMocks(this);
    }

    @Test
    public void shouldCreateUser() {

        User user = new User();
        user.setUsername("name");
        user.setPassword("password");

        UserDTO userDTO = UserAssembler.convertToDto(user);

        User savedUser = userService.create(userDTO);
        verify(repository, times(1)).save(savedUser);
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldFailWhenUserAlreadyExists() {

        User user = new User();
        user.setUsername("name");
        user.setPassword("password");

        UserDTO userDTO = UserAssembler.convertToDto(user);

        when(repository.findById(user.getUsername())).thenReturn(Optional.of(new User()));
        userService.create(userDTO);
    }
}
