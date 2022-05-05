import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage {
  image = null;
  constructor(private router: Router) {}

  ionViewDidEnter() {
    this.image = localStorage.getItem('image');
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

  goToPiiPage() {
    this.router.navigate(['/pii-page']);
  }

  goToPublishPage() {
    this.router.navigate(['/publish-activity']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/landing']);
  }
}
