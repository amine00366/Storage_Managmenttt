import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArmoireService } from '../services/armoire-service.service';
import { Armoire } from '../services/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modifierarmoir',
  templateUrl: './modifierarmoir.component.html',
  styleUrls: ['./modifierarmoir.component.css']
})
export class ModifierarmoirComponent {
  armoireForm!: FormGroup;
  id!: number;
  armoire!: Armoire;

  constructor(
    private formBuilder: FormBuilder,
    private armoireService: ArmoireService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    // Initialisation du formulaire avec des validations
    this.armoireForm = this.formBuilder.group({
      nomArmoire: ['', Validators.required],
      emplacement: ['', Validators.required],
      description: ['', Validators.required],
      etat: [true, Validators.required]
    });

    // Chargement des données de l'armoire à modifier
    this.armoireService.getArmoireById(this.id).subscribe(data => {
      this.armoire = data;
      this.armoireForm.patchValue({
        nomArmoire: this.armoire.nomArmoire,
        emplacement: this.armoire.emplacement,
        description: this.armoire.description,
        etat: this.armoire.etat
      });
    });
  }

  // Méthode de soumission du formulaire pour modifier l'armoire
  onSubmit() {
    if (this.armoireForm.valid) {
      this.armoireService.updateArmoire(this.id, this.armoireForm.value).subscribe(
        () => {
          console.log('Armoire mise à jour avec succès');
          this.router.navigate(['/Armoire']);
        },
        error => {
          console.error('Erreur lors de la mise à jour', error);
        }
      );
    }
  }
}
