import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, LoginRequest, RegisterRequest } from '../../models/auth';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

   private apiUrl = 'http://localhost:8080/api/auth'; 

  constructor (private http: HttpClient){}

  register(registerRequest:RegisterRequest):Observable<AuthResponse>{

    return this.http.post<AuthResponse>
        (`${this.apiUrl}/register`,registerRequest).pipe(
          tap(response => this.saveToken(response.token))
        );
  }

  login(loginRequest:LoginRequest):Observable<AuthResponse>{

    return this.http.post<AuthResponse>
    (`${this.apiUrl}/login`,loginRequest).pipe(
      tap(response => this.saveToken(response.token))
    );
  }

  saveToken(token:string):void{
    localStorage.setItem('token',token);
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean{
    return !! this.getToken();
  
  }
  logout():void{
    localStorage.removeItem('token');
  }

}
