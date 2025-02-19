import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environement/environement';

import { Bande } from './models';  // Assurez-vous que le modèle Bande est bien défini

@Injectable({
  providedIn: 'root'
})
export class BandeService {
  private baseUrl = `${environment.apiUrl}api/bandes`;

  constructor(private http: HttpClient) { }

  getBandes(): Observable<Bande[]> {
    return this.http.get<Bande[]>(`${this.baseUrl}/all`);
  }

  getBande(id: number): Observable<Bande> {
    return this.http.get<Bande>(`${this.baseUrl}/${id}`);
  }

  addBande(bande: Bande): Observable<Bande> {
    return this.http.post<Bande>(`${this.baseUrl}/add`, bande);
  }


  ajouterBande(bande: Bande, armoireId: number): Observable<Bande> {
    const url = `${this.baseUrl}/add/${armoireId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Bande>(url, bande, { headers });
  }

  updateBande(id: number, bande: Bande): Observable<Bande> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Bande>(`${this.baseUrl}/update/${id}`, bande , { headers });
  }

  deleteBande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  getBandeById(id: number): Observable<Bande> {
    return this.http.get<Bande>(`${this.baseUrl}/${id}`);
  }
}
