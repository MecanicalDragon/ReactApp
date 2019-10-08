package net.medrag.ReactApp.jwt;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import net.medrag.ReactApp.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * {@author} Stanislav Tretyakov
 * 27.09.2019
 */
@Slf4j
public class JwtTokenProvider {
    private static String ROLES_KEY = "Roles";
    private static String TYPE_KEY = "Type";
    private static String ACCESS_TYPE = "Access";
    private static String REFRESH_TYPE = "Refresh";

    @Value("${reactapp.jwtSecretTokenKey}")
    private String jwtSecretTokenKey;

    @Value("${reactapp.jwtAccessExpiresInSec}")
    private long jwtAccessExpiresInSec;

    @Value("${reactapp.jwtRefreshExpiresInSec}")
    private long jwtRefreshExpiresInSec;

    public TokenPair generateTokenPair(String username, String roles) {
        Date now = new Date();
        Date accessExpiryDate = new Date(now.getTime() + jwtAccessExpiresInSec * 1000);
        Date refreshExpiryDate = new Date(now.getTime() + jwtRefreshExpiresInSec * 1000);

        String uid = UUID.randomUUID().toString();

        String accessToken = Jwts.builder()
                .setSubject(username)
                .claim(ROLES_KEY, roles)
                .claim(TYPE_KEY, ACCESS_TYPE)
                .setIssuedAt(now)
                .setExpiration(accessExpiryDate)
                .setId(uid)
                .signWith(SignatureAlgorithm.HS512, jwtSecretTokenKey)
                .compact();

        String refreshToken = Jwts.builder()
                .setSubject(username)
                .claim(TYPE_KEY, REFRESH_TYPE)
                .setIssuedAt(now)
                .setExpiration(refreshExpiryDate)
                .setId(uid)
                .signWith(SignatureAlgorithm.HS512, jwtSecretTokenKey)
                .compact();

        return new TokenPair(accessToken, refreshToken, jwtAccessExpiresInSec);
    }

    public TokenPair generateTokenPair(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        String roles = userPrincipal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return generateTokenPair(userPrincipal.getUsername(), roles);
    }

    public Authentication readAuthenticationFromToken(String token) {
        Claims claims = Jwts.parser()
                .require(TYPE_KEY, ACCESS_TYPE)
                .setSigningKey(jwtSecretTokenKey)
                .parseClaimsJws(token)
                .getBody();

        String email = claims.getSubject();
        List<GrantedAuthority> authorities = Arrays.stream(claims.get(ROLES_KEY, String.class).split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        UserPrincipal principal = new UserPrincipal(email, "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecretTokenKey).parseClaimsJws(token);
            return true;
        } catch (SignatureException | MalformedJwtException | ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException | MissingClaimException ex) {
            log.error("JWToken has not been validated because of {}", ex.getMessage());
            return false;
        }
    }

    public TokenPair refreshAccessToken(String accessToken) {
        Claims accessClaims;
        try {
            accessClaims = Jwts.parser()
                    .setSigningKey(jwtSecretTokenKey)
                    .require(TYPE_KEY, ACCESS_TYPE)
                    .parseClaimsJws(accessToken)
                    .getBody();
        } catch (SignatureException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException | MissingClaimException ex) {
            log.error("JWToken could not be parsed because of {}", ex.getMessage());
            return null;
        } catch (ExpiredJwtException ex) {
            accessClaims = ex.getClaims();
        }

        return generateTokenPair(accessClaims.getSubject(), accessClaims.get(ROLES_KEY, String.class));
    }

    public boolean validatePair(String accessToken, String refreshToken) {
        Claims accessClaims;
        try {
            accessClaims = Jwts.parser()
                    .setSigningKey(jwtSecretTokenKey)
                    .require(TYPE_KEY, ACCESS_TYPE)
                    .parseClaimsJws(accessToken)
                    .getBody();
        } catch (SignatureException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException | MissingClaimException ex) {
            log.error("JWToken could not be parsed because of {}", ex.getMessage());
            return false;
        } catch (ExpiredJwtException ex) {
            accessClaims = ex.getClaims();
        }

        try {
            Jwts.parser()
                    .setSigningKey(jwtSecretTokenKey)
                    .require(TYPE_KEY, REFRESH_TYPE)
                    .requireId(accessClaims.getId())
                    .requireSubject(accessClaims.getSubject())
                    .parseClaimsJws(refreshToken);
            return true;
        } catch (SignatureException | MalformedJwtException | ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException | MissingClaimException ex) {
            log.error("JWToken could not be parsed because of {}", ex.getMessage());
        }
        return false;
    }
}
