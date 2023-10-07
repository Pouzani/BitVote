package com.bitvote.project.security.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${application.security.jwt.secret-key}")
    private String secretKey;
    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;
    @Value("${application.security.jwt.refresh-token.expiration}")
    private long refreshExpiration;

    /**
     * The extractUsername function extracts the username from a JWT token.
     *
     *
     * @param String token Pass in the jwt token
     *
     * @return The subject of the jwt
     *
     * @docauthor Trelent
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * The extractClaim function is a generic function that takes in a token and
     * claimsResolver as parameters. The claimsResolver parameter is of type Function,
     * which means it’s an interface with one method called apply. This method takes in
     * Claims and returns the specified type T. In this case, we are using the extractClaim
     * function to return either a String or Long value from our JWT token by passing in the claim name as well as how to map it into our desired object (String or Long).


     *
     * @param String token Pass the token to the function
     * @param Function&lt;Claims Extract the claims from the token
     * @param T&gt; claimsResolver Extract the claims from the token
     *
     * @return The claims from the token
     *
     * @docauthor Trelent
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllclaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * The extractAllclaims function is used to extract all the claims from a JWT token.
     *
     *
     * @param String token Get the token from the request
     *
     * @return The body of the jwt token
     *
     * @docauthor Trelent
     */
    public Claims extractAllclaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigninKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

   /**
     * The generateToken function is used to generate a token for the user.
     *
     *
     * @param UserDetails userDetails Get the username of the user
        public string generatetoken(map&lt;string, object&gt; claims, userdetails userdetails){
            return jwts
     *
     * @return A token, which is a string
     *
     * @docauthor Trelent
     */
    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(),userDetails);
    }


    /**
     * The generateToken function is used to generate a JWT token for the user.
     * It takes in two parameters:
     * 1) extraClaims - A map of claims that will be added to the JWT token. This can be null if no extra claims are needed.
     * 2) userDetails - The UserDetails object containing information about the user whose token is being generated.

     *
     * @param Map&lt;String Add extra claims to the token
     * @param Object&gt; extraClaims Pass in any extra claims that you want to include in the token
     * @param UserDetails userDetails Get the username and password from the userdetails object
     *
     * @return A token that is built by the buildtoken function
     *
     * @docauthor Trelent
     */
    public String generateToken(
            Map<String , Object> extraClaims,
            UserDetails userDetails
    ){
        return buildToken(
                extraClaims,
                userDetails,
                jwtExpiration
        );
    }

    /**
     * The generateRefreshToken function is used to generate a refresh token for the user.
     *
     *
     * @param UserDetails userDetails Get the username of the user
     *
     * @return A token string
     *
     * @docauthor Trelent
     */
    public String generateRefreshToken(UserDetails userDetails){
        return buildToken(new HashMap<>(),userDetails,refreshExpiration);
    }

    /**
     * The buildToken function is responsible for creating a JWT token.
     * It takes in three parameters:
     * 1) extraClaims - A Map of claims that will be added to the JWT token. This can be used to add custom data to the token, such as user roles and permissions.
     * 2) userDetails - The UserDetails object containing information about the user whose credentials were used to create this JWT token. We use this object's username field as our subject claim (sub).
     * 3) expiration - The amount of time in milliseconds until this JWT expires.
     *
     * @param Map&lt;String Set the claims in the token
     * @param Object&gt; extraClaims Add extra claims to the token
     * @param UserDetails userDetails Get the username of the user
     * @param Long expiration Set the expiration time of the token
     *
     * @return A jwt token that contains the user’s username, expiration date and a signature
     *
     * @docauthor Trelent
     */
    public String buildToken(
            Map<String , Object> extraClaims,
            UserDetails userDetails,
            Long expiration
    ){
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigninKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * The isTokenValid function is used to check if the token has expired or not.
     *
     *
     * @param String token Extract the username from the token
     * @param UserDetails userDetails Check if the username in the token matches that of the userdetails object
     *
     * @return A boolean value
     *
     * @docauthor Trelent
     */
    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    /**
     * The isTokenExpired function checks the expiration date of a token.
     *
     *
     * @param String token Extract the expiration date from the token
     *
     * @return True if the token is expired, false otherwise
     *
     * @docauthor Trelent
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * The extractExpiration function extracts the expiration date from a JWT token.
     *
     *
     * @param String token Extract the expiration date from the token
     *
     * @return The expiration date of the token
     *
     * @docauthor Trelent
     */
    private Date extractExpiration(String token) {
        return extractClaim(token,Claims::getExpiration);
    }

    /**
     * The getSigninKey function is used to decode the secret key from Base64.
     * The decoded secret key is then used to create a Key object that will be
     * passed into the Jwts.parser() function in order to verify the signature of
     * our token and ensure it has not been tampered with. If you are using a different
     * encoding scheme, such as Hexadecimal or ASCII, you can use Decoders.* instead of Decoders.BASE64:

        byte[] keyBytes = Decoders.*(secretKey);


     *
     *
     * @return A key that is used to sign the jwt
     *
     * @docauthor Trelent
     */
    private Key getSigninKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
