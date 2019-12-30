package net.medrag.ReactApp.controller;

import io.swagger.annotations.*;
import net.medrag.ReactApp.domain.User;
import net.medrag.ReactApp.domain.UserService;
import net.medrag.ReactApp.jwt.JwtTokenProvider;
import net.medrag.ReactApp.jwt.TokenPair;
import net.medrag.ReactApp.requests.LoginRequest;
import net.medrag.ReactApp.requests.UserRoles;
import net.medrag.ReactApp.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * {@author} Stanislav Tretyakov
 * 27.09.2019
 */
@RestController
@RequestMapping("/auth")
@Api(value = "Authentication", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthController {

    private AuthenticationManager authenticationManager;
    private JwtTokenProvider tokenProvider;
    private UserService userService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userService = userService;
    }

    @PostMapping("/login")
    @ApiOperation("Perform login")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "OK", response = TokenPair.class)})
    public ResponseEntity<TokenPair> login(@ApiParam(value="email and password", required = true) @Valid LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        TokenPair jwt = tokenProvider.generateTokenPair(authentication);

        return ResponseEntity.ok(jwt);
    }

    @GetMapping("/getRoles")
    @ApiOperation("Receive list of user roles")
    public ResponseEntity<UserRoles> getUserRoles() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserPrincipal) {
            UserPrincipal user = (UserPrincipal) principal;
            List<String> roles = (user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()));
            return ResponseEntity.ok(new UserRoles(user.getEmail(), roles));
        } else return ResponseEntity.ok(new UserRoles());
    }

    @PostMapping("/mycard")
    @ApiOperation("Performs authentication with smartcard (not implemented yet).")
    public ResponseEntity<TokenPair> mycard(@RequestBody String x509email) {

        Optional<User> byEmail = userService.findUserByEmail(x509email);
        if (byEmail.isPresent()) {
            User user = byEmail.get();
            String authString = String.join(",", user.getRoles());
            List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList(authString);
            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                    user.getEmail(), null, grantedAuthorities));
            TokenPair jwt = tokenProvider.generateTokenPair(user.getEmail(), authString);
            return ResponseEntity.ok(jwt);
        } else return ResponseEntity.badRequest().build();
    }
}
