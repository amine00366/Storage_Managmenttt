import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArmoireService } from '../services/armoire-service.service';
import { Router } from '@angular/router';
import { Armoire } from '../services/models';


@Component({
  selector: 'app-ajouter-armoire',
  templateUrl: './ajouter-armoire.component.html',
  styleUrls: ['./ajouter-armoire.component.css']
})
export class AjouterArmoireComponent {
  armoireForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private armoireService: ArmoireService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.armoireForm = this.formBuilder.group({
      nomArmoire: ['', Validators.required],
      emplacement: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.armoireForm.valid) {
      this.armoireService.ajouterArmoire(this.armoireForm.value).subscribe(
        (response: Armoire) => {
          console.log('Armoire ajoutée avec succès!', response);
          this.router.navigate(['/home']); // Rediriger après succès
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout de l\'armoire', error);
        }
      );
    }
  }
}
