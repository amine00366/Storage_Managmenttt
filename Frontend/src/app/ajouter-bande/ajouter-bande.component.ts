import { Component, OnInit } from '@angular/core';
import { Armoire, Bande } from '../services/models';
import { BandeService } from '../services/bande.service';
import { Router } from '@angular/router';
import { ArmoireService } from '../services/armoire-service.service';
@Component({
  selector: 'app-ajouter-bande',
  templateUrl: './ajouter-bande.component.html',
  styleUrls: ['./ajouter-bande.component.css']
})
export class AjouterBandeComponent implements OnInit{

  bande: Bande = new Bande();
  armoireId!: number;
  armoires: Armoire[] = []; 
  selectedArmoireId!: number;// ID de l'armoire à laquelle la bande sera affectée

  constructor(private bandeService: BandeService,  private armoireService: ArmoireService, private router: Router) { }



  ngOnInit(): void {
    this.getArmoires();  // Récupère la liste des armoires au chargement du composant
  }

  getArmoires() {
    this.armoireService.afficherArmoire().subscribe(
      (response: Armoire[]) => {
        this.armoires = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des armoires', error);
      }
    );
  }
  // Méthode pour ajouter une nouvelle bande
  ajouterBande() {
    this.bandeService.ajouterBande(this.bande, this.selectedArmoireId).subscribe(
      (response) => {
        console.log('Bande ajoutée avec succès', response);
        this.router.navigate(['/Bandes']); // Redirection après ajout
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la bande', error);
      }
    );
  }

}
