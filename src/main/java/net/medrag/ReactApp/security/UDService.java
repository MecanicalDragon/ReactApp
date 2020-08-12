package net.medrag.ReactApp.security;

import net.medrag.ReactApp.domain.User;
import net.medrag.ReactApp.domain.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

/**
 * {@author} Stanislav Tretyakov
 * 27.09.2019
 */
public class UDService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findUserByEmail(email).orElseThrow(() ->
                        new UsernameNotFoundException("User with specified email does not exist: " + email));

        return new UserPrincipal(user.getEmail(), user.getPassword(),
                user.getRoles().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
    }
}
