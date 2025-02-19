import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SigninRequest } from '../services/models';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent   implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { 
    // Initialisation de loginForm ici
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Pas besoin d'initialiser loginForm ici
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const signinRequest: SigninRequest = this.loginForm.value;
      this.userService.signin(signinRequest).subscribe(
        response => {
          console.log('Login successful', response);
          this.router.navigate(['/ajouterArmoire']);
        },
        error => {
          console.error('Login failed', error);
        }
      );
    }
  }
}
