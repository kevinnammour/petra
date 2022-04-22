/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchModalComponent } from '../components/search-modal/search-modal.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private modalCtrl: ModalController, private http: HttpClient) {}

  getData() {
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: token,
    });

    this.http
      .get(`http://localhost/petra/server/apis/account/get_pii.php`, {
        headers,
      })
      .subscribe(console.log);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SearchModalComponent,
    });

    await modal.present();
  }
}
