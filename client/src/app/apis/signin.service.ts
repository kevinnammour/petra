import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  private signinUrl = 'http://localhost/petra/server/apis/auth/signin.php';
  constructor(private http: HttpClient) {}

  signin(credentials: any) {
    return this.http
      .post<{ token: string }>(this.signinUrl, credentials)
      .pipe(map((response) => response.token));
  }
}
