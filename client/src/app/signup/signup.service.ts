import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SignupService {
  private signupUrl = 'http://localhost/petra/server/apis/auth/signup.php';
  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post(`${this.signupUrl}`, user);
  }
}
