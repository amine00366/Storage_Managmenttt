package com.example.stage4eme.Entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Bande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String numBande;
    private String label;
    private Date debut;
    private Date fin;
    private String description ;
    private Number numCasier;
    @ManyToOne
    @JoinColumn(name = "armoire_id")
    @JsonBackReference
    private Armoire armoire;


}
