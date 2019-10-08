package net.medrag.ReactApp.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * {@author} Stanislav Tretyakov
 * 08.10.2019
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserRoles {

    private String email;
    private List<String> roles;
}
