package com.example.stage4eme.Services;

import com.example.stage4eme.Entities.Armoire;
import com.example.stage4eme.Entities.Bande;

import java.util.List;

public interface BandeService {


    Bande ajouterBande (Bande  bande,Long armoirid);

    List<Bande > afficherArmoire();

    void deleteBande(Long id);

    Bande  updateArmoire(Long id, Bande  bande);

    public Bande getBandeById(Long id);
}
