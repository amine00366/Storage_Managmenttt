import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UtilisatuerComponent } from './utilisatuer/utilisatuer.component';
import { AjouterutilisateurComponent } from './ajouterutilisateur/ajouterutilisateur.component';
import { ArmoireComponent } from './armoire/armoire.component';
import { AjouterArmoireComponent } from './ajouter-armoire/ajouter-armoire.component';
import { BandeComponent } from './bande/bande.component';
import { AjouterBandeComponent } from './ajouter-bande/ajouter-bande.component';
import { ModifierarmoirComponent } from './modifierarmoir/modifierarmoir.component';
import { ModifierbandeComponent } from './modifierbande/modifierbande.component';
import { ConnexionComponent } from './connexion/connexion.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  
  { path: 'armoire/:id', component: ConnexionComponent },
  { path: '', component: LoginComponent },
  { path: 'users', component: UtilisatuerComponent },
  { path: 'adduser', component: AjouterutilisateurComponent },
  { path: 'Armoire', component: ArmoireComponent },
  { path: 'ajouterArmoire', component: AjouterArmoireComponent },
  { path: 'Bandes', component: BandeComponent },
  { path: 'ajouterbande', component: AjouterBandeComponent },
  { path: 'modifierarmoir/:id', component: ModifierarmoirComponent },
  { path: 'bandes/edit/:id', component: ModifierbandeComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
