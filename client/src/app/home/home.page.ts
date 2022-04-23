/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchModalComponent } from '../components/search-modal/search-modal.component';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private modalCtrl: ModalController, private http: HttpClient) {}

  getUserData() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.post('http://localhost/petra/server/apis/account/test.php', 'body', {headers}).subscribe(console.log);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SearchModalComponent,
    });

    await modal.present();
  }
}
