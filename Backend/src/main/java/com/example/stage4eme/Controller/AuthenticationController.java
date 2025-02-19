package com.example.stage4eme.Controller;

import com.example.stage4eme.DTO.JWTAuthenticationResponse;
import com.example.stage4eme.DTO.RefreshTokenRequest;
import com.example.stage4eme.DTO.SignUpRequest;
import com.example.stage4eme.DTO.SigninRequest;
import com.example.stage4eme.Entities.Role;
import com.example.stage4eme.Entities.User;
import com.example.stage4eme.Services.AuthenticationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService ;

    @PostMapping("/signup")
    public ResponseEntity<User> signup (@RequestBody SignUpRequest signUpRequest){
        return ResponseEntity.ok(authenticationService.signup(signUpRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<JWTAuthenticationResponse> signin (@RequestBody SigninRequest signinRequest){
        return ResponseEntity.ok(authenticationService.signin(signinRequest));
    }


    @PostMapping("/refresh")
    public ResponseEntity<JWTAuthenticationResponse> refresh (@RequestBody RefreshTokenRequest refreshTokenRequest){
        return ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest));
    }

    @PostMapping("/signupImg")
    public ResponseEntity<?> signup(@ModelAttribute SignUpRequest signUpRequest,
                                    @RequestParam("image") MultipartFile imageFile) {
        try {
            User user = authenticationService.signupImg(signUpRequest, imageFile);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/Allusers")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = authenticationService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        authenticationService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



    @PutMapping("/updateuser1/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id,
                                           @RequestParam(value = "nom", required = false) String nom,
                                           @RequestParam(value = "prenom", required = false) String prenom,
                                           @RequestParam(value = "email", required = false) String email,
                                           @RequestParam(value = "motDePasse", required = false) String motDePasse,
                                           @RequestParam(value = "role", required = false) Role role,
                                           @RequestParam(value = "imageFile", required = false) MultipartFile imageFile) {
        try {
            User updatedUser = authenticationService.updateUser(id, nom, prenom, email, motDePasse, role, imageFile);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
