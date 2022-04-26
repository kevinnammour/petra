/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private modalCtrl: ModalController, private http: HttpClient, private router: Router) {}

  getUserData() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.post('http://localhost/petra/server/apis/account/test.php', 'body', {headers}).subscribe(console.log);
  }

  search() {
    this.router.navigate(['/search']);
  }

  goAccount() {
    this.router.navigate(['/account']);
  }
}
