package com.example.stage4eme.Services;

import com.example.stage4eme.DTO.JWTAuthenticationResponse;
import com.example.stage4eme.DTO.RefreshTokenRequest;
import com.example.stage4eme.DTO.SignUpRequest;
import com.example.stage4eme.DTO.SigninRequest;
import com.example.stage4eme.Entities.Role;
import com.example.stage4eme.Entities.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AuthenticationService {
    User signup (SignUpRequest signUpRequest);
    JWTAuthenticationResponse signin (SigninRequest signinRequest);
    JWTAuthenticationResponse refreshToken (RefreshTokenRequest refreshTokenRequest);

    public User signupImg(SignUpRequest signUpRequest, MultipartFile imageFile);

    public List<User> getAllUsers();

    public void deleteUser(Long id);



    public User getUserById(Long id);



    public User updateUser(Long id, String nom, String prenom, String email, String motDePasse, Role role, MultipartFile imageFile);
}

