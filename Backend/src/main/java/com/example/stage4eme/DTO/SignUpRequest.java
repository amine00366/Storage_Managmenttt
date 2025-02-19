package com.example.stage4eme.DTO;

import com.example.stage4eme.Entities.Role;
import lombok.Data;

@Data
public class SignUpRequest {

    private String nom;

    private String prenom;

    private String email ;

    private String motDePasse;

    private String imageBase64;

    private Role role;

}
