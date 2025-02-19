package com.example.stage4eme.DTO;

import com.example.stage4eme.Entities.Bande;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CasierDetails {
    private int nombreBandes;
    private int capaciteRestante;
    private List<Bande> bandes;

    public CasierDetails(int nombreBandes, int capaciteRestante, List<Bande> bandes) {
        this.nombreBandes = nombreBandes;
        this.capaciteRestante = capaciteRestante;
        this.bandes = bandes;
    }
}
