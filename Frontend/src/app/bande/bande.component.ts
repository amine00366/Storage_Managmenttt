import { Component } from '@angular/core';
import { BandeService } from '../services/bande.service';
import { Bande } from '../services/models';
import { ModifierbandeComponent } from '../modifierbande/modifierbande.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bande',
  templateUrl: './bande.component.html',
  styleUrls: ['./bande.component.css']
})
export class BandeComponent {
  bandes: Bande[] = [];

  constructor(private bandeService: BandeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadBandes();
  }
  deleteBande(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette bande ?')) {
      this.bandeService.deleteBande(id).subscribe(
        () => {
          // Mettre à jour la liste des armoires après suppression
          this.bandes = this.bandes.filter(bande => bande.id !== id);
        },
        error => {
          console.error('Erreur lors de la suppression de l\'bande', error);
        }
      );
    }
  }

  loadBandes(): void {
    this.bandeService.getBandes().subscribe(data => {
      this.bandes = data;
      console.log('Bandes', this.bandes);
    });
  }

  openEditDialog(id: number): void {
    const dialogRef = this.dialog.open(ModifierbandeComponent, {
      width: '900px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Mettre à jour la liste après modification si nécessaire
      }
    });
  }
}
