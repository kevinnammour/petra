/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Pii {
  full_name: string;
  username: string;
  country: string;
  gender: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  tiktok: string;
}

export interface Activity {
  category: string;
  description: string;
  price: string;
  location: string;
}

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

  savePersonalInformation(pii: Pii) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(`${this.proxy}/put_pii.php`, pii, { headers });
  }

  addActivity(activity: Activity) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.proxy}/add_activity.php`, activity, {
      headers,
    });
  }
}
