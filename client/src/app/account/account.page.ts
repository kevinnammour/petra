import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AccountService } from 'app/apis/account/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage {
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private accountService: AccountService
  ) {}

  goHome() {
    this.router.navigate(['/home']);
  }

  goToPiiPage() {
    this.router.navigate(['/pii-page']);
  }

  goToPublishPage() {
    this.router.navigate(['/publish-activity']);
  }
}
