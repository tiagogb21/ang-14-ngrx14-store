import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

const KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private url: string = 'https://api-labs.tindin.com.br/auth';

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.httpClient
      .post(this.url, {
        email,
        password,
      })
      .pipe(tap((data) => this.saveToken(data)));
  }

  getToken(): string {
    const token = localStorage.getItem(KEY);
    if (token == null) this.router.navigateByUrl('login');
    return token || '';
  }

  saveToken(data: any) {
    localStorage.setItem(KEY, data.token);
  }
}
