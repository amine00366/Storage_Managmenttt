package com.example.stage4eme.Services.impl;

import com.example.stage4eme.DTO.ArmoireDetails;
import com.example.stage4eme.DTO.CasierDetails;
import com.example.stage4eme.Entities.Armoire;
import com.example.stage4eme.Entities.Bande;
import com.example.stage4eme.Repositories.ArmoireRepository;
import com.example.stage4eme.Services.ArmoireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ArmoireSereviceImpl implements ArmoireService {

    @Autowired
    private ArmoireRepository armoireRepository;

    @Override
    public Armoire ajouterArmoire(Armoire armoire) {

        return armoireRepository.save(armoire);
    }

    @Override
    public List<Armoire> afficherArmoire() {
        return armoireRepository.findAll();
    }

    @Override
    public void deleteArmoire(Long id) {
        armoireRepository.deleteById(id);
    }

    @Override
    public Armoire updateArmoire(Long id, Armoire armoireDetails) {
        Armoire armoire = armoireRepository.findById(id)
                .orElseThrow((null));

        armoire.setNomArmoire(armoireDetails.getNomArmoire());
        armoire.setDescription(armoireDetails.getDescription());
        armoire.setEtat(armoireDetails.isEtat());
        armoire.setEmplacement(armoireDetails.getEmplacement());

        return armoireRepository.save(armoire);
    }

    @Override
    public Armoire getArmoireById(Long id) {
        return armoireRepository.findById(id).orElse(null);

    }

    @Override
//    public ArmoireDetails getArmoireDetails(Long id) {
//        Armoire armoire = armoireRepository.findArmoireWithBandesById(id);
//
//        List<Object[]> bandesPerCasierResults = armoireRepository.countBandesPerCasier(id);
//        Map<Number, CasierDetails> casiersDetailsMap = new HashMap<>();
//
//        for (Object[] result : bandesPerCasierResults) {
//            Number casier = (Number) result[0];
//            Integer count = ((Long) result[1]).intValue();
//            casiersDetailsMap.put(casier, new CasierDetails(count, 100 - count));
//        }
//
//        ArmoireDetails armoireDetails = new ArmoireDetails();
//        armoireDetails.setArmoire(armoire);
//        armoireDetails.setCasiersDetails(casiersDetailsMap);
//
//        return armoireDetails;
//    }
    public ArmoireDetails getArmoireDetails(Long id) {
        Armoire armoire = armoireRepository.findArmoireWithBandesById(id);

        List<Object[]> bandesPerCasierResults = armoireRepository.countBandesPerCasier(id);
        List<Bande> bandes = armoireRepository.findBandesByArmoireId(id);
        Map<Number, CasierDetails> casiersDetailsMap = new HashMap<>();

        int totalBandesCount = 0;

        for (Object[] result : bandesPerCasierResults) {
            Number casier = (Number) result[0];
            Integer count = ((Long) result[1]).intValue();
            totalBandesCount += count;
            List<Bande> bandesInCasier = bandes.stream()
                    .filter(b -> b.getNumCasier().equals(casier))
                    .collect(Collectors.toList());
            casiersDetailsMap.put(casier, new CasierDetails(count, 100 - count, bandesInCasier));
        }

        ArmoireDetails armoireDetails = new ArmoireDetails();
        armoireDetails.setArmoire(armoire);
        armoireDetails.setCasiersDetails(casiersDetailsMap);
        armoireDetails.setTotalBandesUtilisees(600 - totalBandesCount);

        return armoireDetails;
    }

}



