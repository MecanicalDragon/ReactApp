package net.medrag.ReactApp.domain;

import org.springframework.stereotype.Service;

import java.util.*;

/**
 * {@author} Stanislav Tretyakov
 * 27.09.2019
 */
@Service
public class UserService {

    private static List<User>userRepo;

    static {
        userRepo = new ArrayList<>();
        userRepo.add(new User("admin@react.com",
                "$2a$10$Fyfo/en9rTrWuSuFrBo0jeLUVVEYKXIXihzd3thhPVq3mJphj38CW", //  password: admin
                Arrays.asList("ROLE_USER", "ROLE_ADMIN")));
        userRepo.add(new User("user@react.com",
                "$2a$10$YutM7It0bc0npu.Kzv3TIuA379esFmGauzGCvMuJMyNFIddNWBRse",  //  password: user
                Collections.singletonList("ROLE_USER")));
    }

    public Optional<User> findUserByEmail(String email) {
        return userRepo.stream().filter(u -> u.getEmail().equals(email)).findFirst();
    }
}
