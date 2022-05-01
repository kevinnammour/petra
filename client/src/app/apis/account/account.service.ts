/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private proxy = 'http://localhost/petra/server/apis/account';

  constructor(private http: HttpClient) {}

  getPersonalInformation() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.proxy}/get_pii.php`, { headers });
  }

  savePersonalInformation(pii: any) {
    console.log(pii);
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(`${this.proxy}/put_pii.php`, pii, { headers });
  }

  addActivity(activityInfo: any) {
    console.log(activityInfo);
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.proxy}/add_activity.php`, activityInfo, { headers });
  }
}
