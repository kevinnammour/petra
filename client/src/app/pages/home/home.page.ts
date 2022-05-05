/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  image = null;
  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private router: Router
  ) {}

  getUserData() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .post('http://localhost/petra/server/apis/account/test.php', 'body', {
        headers,
      })
      .subscribe(console.log);
  }

  ionViewDidEnter() {
    this.image = localStorage.getItem('image');
  }

  search() {
    this.router.navigate(['/search']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goBookmarks() {
    this.router.navigate(['/bookmarks']);
  }

  goAccount() {
    this.router.navigate(['/account']);
  }
}
