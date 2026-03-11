package com.example.ecommerce.user;

import com.example.ecommerce.exception.UserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    // I took username as email for JWT
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElseGet(null);

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                new ArrayList<>()
        );
    }

    public User createUser( User user) throws Exception{
        if (userExist(user.getEmail())) throw new UserException("Invalid user credentials");

        return userRepository.save(user);
    }

    private Boolean userExist( String email) {
        return userRepository.findByEmail(email).isPresent();
    }
}
