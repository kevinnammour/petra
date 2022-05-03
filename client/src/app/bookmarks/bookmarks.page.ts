import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
})
export class BookmarksPage {
  constructor(private router: Router) {}

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
