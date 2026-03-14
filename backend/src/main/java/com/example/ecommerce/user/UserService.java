package com.example.ecommerce.user;

import com.example.ecommerce.exception.UserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;


@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    // I took username as email for JWT
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElseGet(null);
        
        if (user.getIsVerified() == 0)
            throw new UserException("User Email is not Verified!");


        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                new ArrayList<>()
        );
    }

    public User createUser(User user) throws Exception {
        if (userExist(user.getEmail())) throw new UserException("Invalid user credentials");

        return userRepository.save(user);
    }

    private Boolean userExist(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public boolean verifyUserEmail(Long userId, String email, String object) {
        User user = userRepository.findById(userId).get();

        if (!user.getEmail().equals(email) && !object.equals("email_verification"))
            return false;

        user.setIsVerified(1);

        userRepository.save(user);

        return true;
    }
}
