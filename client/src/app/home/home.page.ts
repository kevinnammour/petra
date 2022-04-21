import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchModalComponent } from '../components/search-modal/search-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  accounts = [
    {
      name: 'Hussein Muhammad',
      balance: 1000
    },
    {
      name: 'Kevin Nammour',
      balance: 2000
    }
  ];
  constructor(private modalCtrl: ModalController) {

  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SearchModalComponent
    });

    await modal.present();
  };



}
