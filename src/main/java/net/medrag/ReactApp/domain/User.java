package net.medrag.ReactApp.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * {@author} Stanislav Tretyakov
 * 27.09.2019
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    private String email;
    private String password;
    private List<String> roles;
}
