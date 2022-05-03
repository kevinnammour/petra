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

  goBookmarks() {
    this.router.navigate(['/bookmarks']);
  }

  goAccount() {
    this.router.navigate(['/account']);
  }

  goToPiiPage() {
    this.router.navigate(['/pii-page']);
  }

  goToPublishPage() {
    this.router.navigate(['/publish-activity']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/landing']);
  }
}
