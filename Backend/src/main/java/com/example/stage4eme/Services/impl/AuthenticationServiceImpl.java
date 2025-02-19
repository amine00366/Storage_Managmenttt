package com.example.stage4eme.Services.impl;

import com.example.stage4eme.DTO.JWTAuthenticationResponse;
import com.example.stage4eme.DTO.RefreshTokenRequest;
import com.example.stage4eme.DTO.SignUpRequest;
import com.example.stage4eme.DTO.SigninRequest;
import com.example.stage4eme.Entities.Role;
import com.example.stage4eme.Entities.User;
import com.example.stage4eme.Repositories.UserRepository;
import com.example.stage4eme.Services.AuthenticationService;
import com.example.stage4eme.Services.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public User signup(SignUpRequest signUpRequest) {
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setNom(signUpRequest.getNom());
        user.setPrenom(signUpRequest.getPrenom());
        user.setRole(Role.USER);


        user.setMotDePasse(passwordEncoder.encode(signUpRequest.getMotDePasse()));

        return userRepository.save(user);
    }

    public JWTAuthenticationResponse signin(SigninRequest signinRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getEmail(),
                signinRequest.getMotDePasse()));

        var user = userRepository.findByEmail(signinRequest.getEmail()).orElseThrow(() -> new IllegalArgumentException("invalid Email or MotDepasse"));
        var jwt = jwtService.generateToken(user);
        var refreshtoken = jwtService.generateRefreshToken(new HashMap<>(), user);


        JWTAuthenticationResponse jwtAuthenticationResponse = new JWTAuthenticationResponse();

        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshtoken);
        return jwtAuthenticationResponse;
    }

    public JWTAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String userEmail = jwtService.ExtractUserName(refreshTokenRequest.getToken());
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        if (jwtService.isTokenValid(refreshTokenRequest.getToken(), user)) {
            var jwt = jwtService.generateToken(user);

            JWTAuthenticationResponse jwtAuthenticationResponse = new JWTAuthenticationResponse();

            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
            return jwtAuthenticationResponse;

        }
        return null;
    }

    @Override
    public User signupImg(SignUpRequest signUpRequest, MultipartFile imageFile) {
        User user = new User();

        user.setEmail(signUpRequest.getEmail());
        user.setNom(signUpRequest.getNom());
        user.setPrenom(signUpRequest.getPrenom());
        if (signUpRequest.getRole() != null) {
            user.setRole(signUpRequest.getRole()); // Assigner le rôle depuis la requête
        } else {
            user.setRole(Role.USER); // Par défaut à USER si aucun rôle n'est fourni
        }
        // Encodage du mot de passe
        user.setMotDePasse(passwordEncoder.encode(signUpRequest.getMotDePasse()));

        // Vérification et encodage de l'image
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                // Convertir l'image en chaîne Base64 pour le stockage
                String encodedImage = Base64.getEncoder().encodeToString(imageFile.getBytes());
                user.setImage(encodedImage);
            } catch (IOException e) {
                // Gérer l'erreur si la conversion échoue
                e.printStackTrace();
                // Tu peux lever une exception personnalisée si nécessaire
                throw new RuntimeException("Erreur lors de l'encodage de l'image", e);
            }
        }

        // Sauvegarder l'utilisateur avec l'image
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }


    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }



    @Override
    public User updateUser(Long id, String nom, String prenom, String email, String motDePasse, Role role, MultipartFile imageFile) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (nom != null) user.setNom(nom);
        if (prenom != null) user.setPrenom(prenom);
        if (email != null) user.setEmail(email);
        if (motDePasse != null) user.setMotDePasse(passwordEncoder.encode(motDePasse));
        if (role != null) user.setRole(role);

        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String encodedImage = Base64.getEncoder().encodeToString(imageFile.getBytes());
                user.setImage(encodedImage);
            } catch (IOException e) {
                throw new RuntimeException("Error encoding image", e);
            }
        }

        return userRepository.save(user);
    }
    }




