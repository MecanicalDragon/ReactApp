package net.medrag.ReactApp.requests;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * {@author} Stanislav Tretyakov
 * 27.09.2019
 */
@Data
@AllArgsConstructor
public class RefreshTokenRequest {
    @NotBlank
    private String accessToken;
    @NotBlank
    private String refreshToken;
}
