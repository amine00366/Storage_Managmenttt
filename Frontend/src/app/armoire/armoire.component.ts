import { Component, OnInit } from '@angular/core';
import { Armoire } from '../services/models';
import { ArmoireService } from '../services/armoire-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModifierDialogARMComponent } from '../modifier-dialog-arm/modifier-dialog-arm.component';

@Component({
  selector: 'app-armoire',
  templateUrl: './armoire.component.html',
  styleUrls: ['./armoire.component.css']
})
export class ArmoireComponent implements OnInit {
  armoires: Armoire[] = [];

  constructor(private armoireService: ArmoireService, private router: Router,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getArmoires();
  }

  // Récupérer les armoires depuis le service
  getArmoires(): void {
    this.armoireService.afficherArmoire().subscribe(
      (data: Armoire[]) => {
        this.armoires = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des armoires', error);
      }
    );
  }

  deleteArmoire(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette armoire ?')) {
      this.armoireService.deleteArmoire(id).subscribe(
        () => {
          // Mettre à jour la liste des armoires après suppression
          this.armoires = this.armoires.filter(armoire => armoire.id !== id);
        },
        error => {
          console.error('Erreur lors de la suppression de l\'armoire', error);
        }
      );
    }
  }

  modifierArmoire(id: number) {
    this.router.navigate(['/modifierarmoir', id]);
  }





  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ModifierDialogARMComponent, {
      width: '600px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Le dialog a été fermé avec succès');
        this.getArmoires();
        // Optionnel : Rafraîchir la liste des armoires ou autre action après la mise à jour
      }
    });
  }
}
