import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { SignUpRequest } from '../services/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-ajouterutilisateur',
  templateUrl: './ajouterutilisateur.component.html',
  styleUrls: ['./ajouterutilisateur.component.css']
})
export class AjouterutilisateurComponent {
  // file!: File;
  // signUpRequest : SignUpRequest = {
  //   nom: '',
  //   prenom: '',
  //   email: '',
  //   motDePasse: '',
  //   role: 'UTILISATEUR' ,
  //   image :''
  // };
  // constructor(private userService: UserService) { }

  // onSubmit() {
  //   this.userService.signup(this.signUpRequest).subscribe(
  //     response => {
  //       console.log('Inscription réussie!', response);
  //     },
  //     error => {
  //       console.error('Erreur lors de l\'inscription', error);
  //     }
  //   );
  // }

  // onFileSelectedd(event: any) {
  //   this.file = event.target.files;
  // }

  signupForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private signupService: UserService) {
    // Initialisation du formulaire
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      image: [null], // Champ pour l'image
      role: ['', Validators.required]
    });
  }

  // Méthode pour sélectionner l'image
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Méthode pour soumettre le formulaire
  // onSubmit() {
  //   if (this.signupForm.valid && this.selectedFile) {
  //     const formData = new FormData();

  //     formData.append('email', this.signupForm.get('email')?.value);
  //     formData.append('nom', this.signupForm.get('nom')?.value);
  //     formData.append('prenom', this.signupForm.get('prenom')?.value);
  //     formData.append('motDePasse', this.signupForm.get('motDePasse')?.value);
  //     formData.append('image', this.selectedFile); // Ajout de l'image

  //     this.signupService.signupImg(formData).subscribe(
  //       (response) => {
  //         console.log('Utilisateur inscrit avec succès', response);
  //       },
  //       (error) => {
  //         console.error('Erreur lors de l\'inscription', error);
  //       }
  //     );
  //   }
  // }

  onSubmit() {
    if (this.signupForm.valid && this.selectedFile) {
      const formData = new FormData();
  
      // Utilisation de la syntaxe d'accès par clé
      formData.append('email', this.signupForm.get('email')?.value);
      formData.append('nom', this.signupForm.get('nom')?.value);
      formData.append('prenom', this.signupForm.get('prenom')?.value);
      formData.append('motDePasse', this.signupForm.get('motDePasse')?.value);  // Correcte
      formData.append('image', this.selectedFile);  // Ajout de l'image
      formData.append('role', this.signupForm.get('role')?.value);
  
      this.signupService.signupImg(formData).subscribe(
        (response) => {
          console.log('Utilisateur inscrit avec succès', response);
        },
        (error) => {
          console.error('Erreur lors de l\'inscription', error);
        }
      );
    }
  }
}
