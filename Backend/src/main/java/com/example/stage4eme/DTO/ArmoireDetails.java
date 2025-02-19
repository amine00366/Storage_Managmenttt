package com.example.stage4eme.DTO;

import com.example.stage4eme.Entities.Armoire;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class ArmoireDetails {

    private Armoire armoire;
    private Map<Number, CasierDetails> casiersDetails;
    private int totalBandesUtilisees;

    // Getters and setters
}
