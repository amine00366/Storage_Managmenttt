import { Component, Inject } from '@angular/core';
import { Armoire, Bande } from '../services/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BandeService } from '../services/bande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArmoireService } from '../services/armoire-service.service';

@Component({
  selector: 'app-modifierbande',
  templateUrl: './modifierbande.component.html',
  styleUrls: ['./modifierbande.component.css']
})
export class ModifierbandeComponent {
  updateForm: FormGroup;
  bande!: Bande;
  armoires: Armoire[] = [];
  selectedArmoireId!: number;

  constructor(
    public dialogRef: MatDialogRef<ModifierbandeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private bandeService: BandeService,
    private armoireService: ArmoireService
  ) {
    this.updateForm = this.fb.group({
      numBande: ['', Validators.required],
      label: ['', Validators.required],
      debut: ['', Validators.required],
      fin: ['', Validators.required],
      description: ['', Validators.required],
      numCasier: ['', Validators.required],
      armoireId: [null, Validators.required] // Utilisation de 'armoireId' comme 'number'
    });
  }

  ngOnInit(): void {
    this.bandeService.getBandeById(this.data.id).subscribe(bande => {
      this.bande = bande;
      this.updateForm.patchValue({
        numBande: bande.numBande,
        label: bande.label,
        debut: bande.debut,
        fin: bande.fin,
        description: bande.description,
        numCasier: bande.numCasier,
        armoireId: bande.armoire ? bande.armoire.id : null // Assigner l'ID de l'armoire
      });
    });

    // Charger les armoires disponibles
    this.getArmoires();
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

  onSubmit(): void {
    if (this.updateForm.valid) {
      const updatedBande = {
        ...this.updateForm.value,
        id: this.bande.id,
        armoire: { id: this.updateForm.value.armoireId } // Assigner correctement l'ID de l'armoire
      };
      console.log('Submitting:', updatedBande); // Ajoutez ceci pour vérifier ce qui est soumis
      this.bandeService.updateBande(this.bande.id, updatedBande).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
