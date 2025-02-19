import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environement/environement';
import { Armoire } from './models';


export interface Bande {
  id: number;
  numBande: string;
  label: string;
  debut: string;
  fin: string;
  description: string;
  numCasier: number;
}

export interface CasierDetails {
  nombreBandes: number;
  capaciteRestante: number;
  bandes: Bande[];
}

export interface ArmoireDetails {
  armoire: {
    id: number;
    nomArmoire: string;
    description: string;
    etat: boolean;
    dateCreation: string;
    emplacement: string;
    bandes: Bande[]; 
  };
  casiersDetails: { [key: number]: CasierDetails };
  totalBandesUtilisees: number;
}

@Injectable({
  providedIn: 'root'
})
export class ArmoireService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }


  ajouterArmoire(armoire: Armoire): Observable<Armoire> {
    return this.http.post<Armoire>(`${this.baseUrl}ajouterArmoire`, armoire , {
      headers: this.getAuthHeaders() // Ajout de l'autorisation JWT dans l'en-tête
    });
  }

 
  afficherArmoire(): Observable<Armoire[]> {
    return this.http.get<Armoire[]>(`${this.baseUrl}afficherArmoire`);
  }


  // Supprimer une armoire par son ID
  deleteArmoire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}deleteArmoire/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
  updateArmoire(id: number, armoire: Armoire): Observable<Armoire> {
    return this.http.put<Armoire>(`${this.baseUrl}update/${id}`, armoire);
  }

  // Récupérer les en-têtes d'autorisation avec le token JWT
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getArmoireById(id: number): Observable<Armoire> {
    return this.http.get<Armoire>(`${this.baseUrl}${id}`);
  }

  getArmoireDetails(id: number): Observable<ArmoireDetails> {
    return this.http.get<ArmoireDetails>(`${this.baseUrl}${id}/details`);
  }
}
