import { Component, Inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../services/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent {
  signupForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateuserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    // Pré-remplissage du formulaire avec les données de l'utilisateur
    this.signupForm = this.fb.group({
      nom: [data.nom, Validators.required],
      prenom: [data.prenom, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      motDePasse: ['', Validators.minLength(6)], // Mot de passe vide, si l'utilisateur souhaite le changer
      role: [data.role, Validators.required],
      imageFile: [null] // Champ pour l'image
    });
  }

  // Gestion de l'upload de fichier
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Soumission du formulaire avec les modifications
  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = { ...this.signupForm.value, imageFile: this.selectedFile };
      this.dialogRef.close(formData);
    }
  }

  // Annuler la modification
  onCancel(): void {
    this.dialogRef.close();
  }
}
