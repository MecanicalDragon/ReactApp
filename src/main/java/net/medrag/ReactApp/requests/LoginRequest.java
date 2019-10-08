package net.medrag.ReactApp.requests;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

/**
 * {@author} Stanislav Tretyakov
 * 27.09.2019
 */
@Data
public class LoginRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;
}
