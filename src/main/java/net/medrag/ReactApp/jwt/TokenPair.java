package net.medrag.ReactApp.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * {@author} Stanislav Tretyakov
 * 27.09.2019
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TokenPair {
    private String accessToken;
    private String refreshToken;
    private long expiresIn;
}
