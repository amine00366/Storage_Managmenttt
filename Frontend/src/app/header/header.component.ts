import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

 
  constructor(private userService: UserService, private router: Router) {}
 
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Retourne true si le token existe, sinon false
  }
 
  logout(): void {
    console.log('Logout successfully',!!localStorage.getItem('token'));
    !!localStorage.getItem('token');
    this.userService.logout();
    this.router.navigate(['home']);  // Redirige l'utilisateur vers la page de connexion après la déconnexion
  }
}
