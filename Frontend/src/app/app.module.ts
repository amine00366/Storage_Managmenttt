import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BandeComponent } from './bande/bande.component';
import { ArmoireComponent } from './armoire/armoire.component';
import { UtilisatuerComponent } from './utilisatuer/utilisatuer.component';
import { AjouterutilisateurComponent } from './ajouterutilisateur/ajouterutilisateur.component';
import { AjouterArmoireComponent } from './ajouter-armoire/ajouter-armoire.component';
import { AjouterBandeComponent } from './ajouter-bande/ajouter-bande.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { ModifierarmoirComponent } from './modifierarmoir/modifierarmoir.component';
import { ModifierbandeComponent } from './modifierbande/modifierbande.component';
import { ModifierDialogARMComponent } from './modifier-dialog-arm/modifier-dialog-arm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UpdateuserComponent } from './updateuser/updateuser.component';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ConnexionComponent } from './connexion/connexion.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    BandeComponent,
    ArmoireComponent,
    UtilisatuerComponent,
    AjouterutilisateurComponent,
    AjouterArmoireComponent,
    AjouterBandeComponent,
    ModifierarmoirComponent,
    ModifierbandeComponent,
    ModifierDialogARMComponent,
    UpdateuserComponent,
    ConnexionComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    HttpClientModule ,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,

  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
