import { Component } from '@angular/core';
import { User } from '../services/models';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateuserComponent } from '../updateuser/updateuser.component';
import { AjouterutilisateurComponent } from '../ajouterutilisateur/ajouterutilisateur.component';

@Component({
  selector: 'app-utilisatuer',
  templateUrl: './utilisatuer.component.html',
  styleUrls: ['./utilisatuer.component.css']
})
export class UtilisatuerComponent {
  users: User[] = [];

  constructor(private userService: UserService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }


  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
  deleteUser(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          // Actualiser la liste des utilisateurs après suppression
          this.users = this.users.filter(user => user.id !== id);
        },
        error => {
          console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        }
      );
    }
  }
  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(UpdateuserComponent, {
      width: '700px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(user.id, result.nom, result.prenom, result.email, result.motDePasse, result.role, result.imageFile)
          .subscribe(updatedUser => {
            this.loadUsers(); // Recharge la liste après mise à jour
          });
      }
    });
  }
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AjouterutilisateurComponent, {
      width: '1000px',
      data: {}  // Passe les données nécessaires au dialog ici
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Traitement des résultats du dialog ici
    });
  }
}
