package net.medrag.ReactApp.controller;

import net.medrag.ReactApp.jwt.JwtTokenProvider;
import net.medrag.ReactApp.requests.RefreshTokenRequest;
import net.medrag.ReactApp.jwt.TokenPair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * {@author} Stanislav Tretyakov
 * 27.09.2019
 */
@RestController
@RequestMapping("/token")
public class TokenController {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/refresh")
    public ResponseEntity<TokenPair> refreshTokenPair(@Valid RefreshTokenRequest refreshRequest) {
        if (tokenProvider.validatePair(refreshRequest.getAccessToken(), refreshRequest.getRefreshToken())) {
            return ResponseEntity.ok(tokenProvider.refreshAccessToken(refreshRequest.getAccessToken()));
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
