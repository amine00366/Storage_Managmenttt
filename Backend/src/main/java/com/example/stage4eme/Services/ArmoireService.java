package com.example.stage4eme.Services;

import com.example.stage4eme.DTO.ArmoireDetails;
import com.example.stage4eme.Entities.Armoire;

import java.util.List;

public interface ArmoireService {

    Armoire ajouterArmoire(Armoire armoire);

    List<Armoire> afficherArmoire ();

    void deleteArmoire(Long id);

    Armoire updateArmoire(Long id,Armoire armoire);

    Armoire getArmoireById(Long id);

    public ArmoireDetails getArmoireDetails(Long id);
}
