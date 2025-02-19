import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArmoireService } from '../services/armoire-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modifier-dialog-arm',
  templateUrl: './modifier-dialog-arm.component.html',
  styleUrls: ['./modifier-dialog-arm.component.css']
})
export class ModifierDialogARMComponent {
  armoireForm!: FormGroup;
  id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private armoireService: ArmoireService,
    public dialogRef: MatDialogRef<ModifierDialogARMComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },

  ) {}

  ngOnInit(): void {
    this.id = this.data.id;

    this.armoireForm = this.formBuilder.group({
      nomArmoire: ['', Validators.required],
      emplacement: ['', Validators.required],
      description: ['', Validators.required],
      etat: [false, Validators.required]
    });

    this.armoireService.getArmoireById(this.id).subscribe(data => {
      this.armoireForm.patchValue({
        nomArmoire: data.nomArmoire,
        emplacement: data.emplacement,
        description: data.description,
        etat: data.etat
      });
    });
  }

  onSubmit(): void {
    if (this.armoireForm.valid) {
      this.armoireService.updateArmoire(this.id, this.armoireForm.value).subscribe(
        () => {
          console.log('Armoire mise à jour avec succès');
          this.dialogRef.close(true);
  
        },
        error => {
          console.error('Erreur lors de la mise à jour', error);
        }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
