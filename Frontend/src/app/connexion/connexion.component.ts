import { Component } from '@angular/core';
import { ArmoireDetails, ArmoireService } from '../services/armoire-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  casiersRange = [1, 2, 3, 4, 5, 6]; // Plage de casiers de 1 à 6
  armoireDetails: ArmoireDetails = {
    armoire: {
      id: 0,
      nomArmoire: '',
      description: '',
      etat: false,
      dateCreation: '',
      emplacement: '',
      bandes: [] // Assurez-vous que bandes est initialisé
    },
    casiersDetails: {},
    totalBandesUtilisees: 0
  };

  constructor(
    private armoireService: ArmoireService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;
    if (id) {
      this.armoireService.getArmoireDetails(id).subscribe(
        data => {
          this.armoireDetails = data;
          this.populateCasiers();
        },
        error => console.error('Error fetching armoire details', error)
      );
    }
  }

 
  populateCasiers(): void {
    this.casiersRange.forEach(casierId => {
      if (!this.armoireDetails.casiersDetails[casierId]) {
        this.armoireDetails.casiersDetails[casierId] = {
          nombreBandes: 0,
          capaciteRestante: 100,
          bandes: [] // Assurez-vous que 'bandes' est défini même si c'est un tableau vide
        };
      }
    });
  }
}
