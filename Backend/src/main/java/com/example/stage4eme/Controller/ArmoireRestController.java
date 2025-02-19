package com.example.stage4eme.Controller;

import com.example.stage4eme.DTO.ArmoireDetails;
import com.example.stage4eme.Entities.Armoire;
import com.example.stage4eme.Services.ArmoireService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ArmoireRestController {

    @Autowired
    private ArmoireService armoireService;

    @GetMapping("/afficherArmoire")
    public List<Armoire> afficherarmoire(){
        return armoireService.afficherArmoire();
    }
    @PostMapping("/ajouterArmoire")
    public Armoire ajouterArmoire(@RequestBody Armoire armoire){
        return armoireService.ajouterArmoire(armoire);
    }

    @DeleteMapping("/deleteArmoire/{id}")
    public void deleteArmoire(@PathVariable Long id ){
        armoireService.deleteArmoire(id);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Armoire> updateArmoire(@PathVariable Long id, @RequestBody Armoire armoireDetails) {
        Armoire updatedArmoire = armoireService.updateArmoire(id, armoireDetails);
        return ResponseEntity.ok(updatedArmoire);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Armoire> getArmoireById(@PathVariable Long id) {
        Armoire armoire = armoireService.getArmoireById(id);
        if (armoire != null) {
            return ResponseEntity.ok(armoire);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<ArmoireDetails> getArmoireDetails(@PathVariable Long id) {
        ArmoireDetails armoireDetails = armoireService.getArmoireDetails(id);
        return ResponseEntity.ok(armoireDetails);
    }
}
