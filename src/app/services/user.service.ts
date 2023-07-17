import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(email: string): Observable<any> {
    return this.http.post('http://localhost:8080/api/register', {email});
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8080/api/login', { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('email', response.email); // Save email in local storage
      })
    );
}

  // user.service.ts
  loginRequest(email: string) {
    return this.http.post('http://localhost:8080/api/login-request', { email });
  }

  verifyToken(token: string) {
    return this.http.get(`http://localhost:8080/api/login/${token}`);
  }



}
