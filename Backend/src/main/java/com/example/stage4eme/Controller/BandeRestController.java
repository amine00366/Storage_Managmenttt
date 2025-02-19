package com.example.stage4eme.Controller;

import com.example.stage4eme.Entities.Bande;
import com.example.stage4eme.Services.BandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/api/bandes")
public class BandeRestController {

    @Autowired
    private BandeService bandeService;

//    @PostMapping("/add")
//    public Bande ajouterBande(@RequestBody Bande bande) {
//        return bandeService.ajouterBande(bande);
//    }

    @PostMapping("/add/{armoireId}")
    public ResponseEntity<Bande> ajouterBande(@RequestBody Bande bande, @PathVariable Long armoireId) {
        try {
            Bande nouvelleBande = bandeService.ajouterBande(bande, armoireId);
            return ResponseEntity.ok(nouvelleBande);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/all")
    public List<Bande> afficherArmoire() {
        return bandeService.afficherArmoire();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBande(@PathVariable Long id) {
        bandeService.deleteBande(id);
    }

    @PutMapping("/update/{id}")
    public Bande updateArmoire(@PathVariable Long id, @RequestBody Bande bandeDetails) {
        return bandeService.updateArmoire(id, bandeDetails);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bande> getBandeById(@PathVariable Long id) {
        Bande bande = bandeService.getBandeById(id);
        return new ResponseEntity<>(bande, HttpStatus.OK);
    }
}
