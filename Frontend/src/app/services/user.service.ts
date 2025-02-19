import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environement/environement';
import { SignUpRequest , SigninRequest , RefreshTokenRequest , User , JWTAuthenticationResponse} from './models';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiUrl}api/v1/auth`;
  constructor(private http: HttpClient) { }

  signup(signUpRequest: SignUpRequest): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/signup`, signUpRequest);
  }


  signupImg(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/signupImg`, formData);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Allusers`);
  }
  // signin(signinRequest: SigninRequest): Observable<JWTAuthenticationResponse> {
  //   return this.http.post<JWTAuthenticationResponse>(`${this.baseUrl}/signin`, signinRequest);
  // }

  // refreshToken(refreshTokenRequest: RefreshTokenRequest): Observable<JWTAuthenticationResponse> {
  //   return this.http.post<JWTAuthenticationResponse>(`${this.baseUrl}/refresh`, refreshTokenRequest);
  // }

  
  signin(signinRequest: SigninRequest): Observable<JWTAuthenticationResponse> {
    return this.http.post<JWTAuthenticationResponse>(`${this.baseUrl}/signin`, signinRequest).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  refreshToken(): Observable<JWTAuthenticationResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<JWTAuthenticationResponse>(`${this.baseUrl}/refresh`, { token: refreshToken }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  updateUser(id: number, nom: string, prenom: string, email: string, motDePasse: string, role: string, imageFile?: File): Observable<User> {
    const formData: FormData = new FormData();

    if (nom) formData.append('nom', nom);
    if (prenom) formData.append('prenom', prenom);
    if (email) formData.append('email', email);
    if (motDePasse) formData.append('motDePasse', motDePasse);
    if (role) formData.append('role', role);
    if (imageFile) formData.append('imageFile', imageFile);

    return this.http.put<User>(`${this.baseUrl}/updateuser1/${id}`, formData);
  }
}
