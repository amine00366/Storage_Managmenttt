package com.example.stage4eme.Entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Armoire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomArmoire;

    private String description ;

    @OneToMany(mappedBy = "armoire", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Bande> bandes;

    private boolean etat ;

    @Column(nullable = false)
    private Date dateCreation;


    private Emplacement emplacement;

    @PrePersist
    protected void onCreate() {
        dateCreation = new Date(System.currentTimeMillis()); // Définir uniquement la date actuelle
    }

}
