export interface SignUpRequest {
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    role: string;  // ou un enum si vous préférez
    image: string; // base64 string
  }
  
  export interface SigninRequest {
    email: string;
    motDePasse: string;
  }
  
  export interface RefreshTokenRequest {
    refreshToken: string;
  }

  export interface User {
    id: number;
    nom: string;
    prenom: string;
    motDePasse: string;
    email: string;
    role: string;
    image: string; // Optionnel si tu veux inclure l'image
  }
  
  export interface JWTAuthenticationResponse {
    token: string;
    refreshToken: string;
    // autres champs éventuels...
  }

  export interface Armoire {
    id: number;
    nomArmoire: string;
    description: string;
    emplacement: string;
    dateCreation:Date
    etat:boolean // Emplacement de l'armoire
  }

  export class Bande {
    id!: number;
    numBande!: string;
    label!: string;
    debut!: Date;
    fin!: Date;
    description!: string;
    numCasier!: number;
    armoire: any; // Référence à l'armoire associée
  }
  
  export interface User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    role: string;
    image: string;
  }
  
  export enum Emplacement {
    Chargia = 'Chargia',
    el_Fejja = 'el_Fejja'
  }
  