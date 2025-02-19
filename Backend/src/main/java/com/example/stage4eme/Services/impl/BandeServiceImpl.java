package com.example.stage4eme.Services.impl;

import com.example.stage4eme.Entities.Armoire;
import com.example.stage4eme.Entities.Bande;
import com.example.stage4eme.Repositories.ArmoireRepository;
import com.example.stage4eme.Repositories.BandeRepository;
import com.example.stage4eme.Services.BandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BandeServiceImpl implements BandeService {

    @Autowired
    private BandeRepository bandeRepository;

    @Autowired
    private ArmoireRepository armoireRepository;

//    @Override
//    public Bande ajouterBande(Bande bande ) {
//        if (bande.getArmoire() != null) {
//            Armoire armoire = armoireRepository.findById(bande.getArmoire().getId())
//                    .orElseThrow((null));
//            bande.setArmoire(armoire);
//
//        }
//        return bandeRepository.save(bande);
//    }

    @Override
    public Bande ajouterBande(Bande bande, Long armoirid) {
        Optional<Armoire> armoireOptional = armoireRepository.findById(armoirid);
        if (armoireOptional.isPresent()) {
            Armoire armoire = armoireOptional.get();
            bande.setArmoire(armoire);
            return bandeRepository.save(bande);
        } else {
            throw new RuntimeException("Armoire non trouvée avec ID : " + armoirid);
        }
    }


    @Override
    public List<Bande> afficherArmoire() {
        return bandeRepository.findAll();
    }

    @Override
    public void deleteBande(Long id) {
        bandeRepository.deleteById(id);
    }

    @Override
    public Bande updateArmoire(Long id, Bande bandeDetails) {
        Optional<Bande> existingBande = bandeRepository.findById(id);
        if (existingBande.isPresent()) {
            Bande updatedBande = existingBande.get();
            updatedBande.setNumBande(bandeDetails.getNumBande());
            updatedBande.setLabel(bandeDetails.getLabel());
            updatedBande.setDebut(bandeDetails.getDebut());
            updatedBande.setFin(bandeDetails.getFin());
            updatedBande.setDescription(bandeDetails.getDescription());
            updatedBande.setNumCasier(bandeDetails.getNumCasier());
            updatedBande.setArmoire(bandeDetails.getArmoire());
            return bandeRepository.save(updatedBande);
        } else {
            throw new RuntimeException("Bande not found with id: " + id);
        }
    }

    @Override
    public Bande getBandeById(Long id) {
        return bandeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bande not found with id: " + id));
    }
}
