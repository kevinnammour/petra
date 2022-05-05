import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BookmarksService } from 'app/apis/bookmarks/bookmarks.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
})
export class BookmarksPage {
  image = null;
  bookmarks: any[] = [];
  constructor(
    private router: Router,
    private bookmarksService: BookmarksService,
    private toastCtrl: ToastController
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

  ionViewDidEnter() {
    this.bookmarksService.getBookmarks().subscribe((res: any) => {
      this.bookmarks = res;
    });
    this.image = localStorage.getItem('image');
  }

  removeBookmark(activity: any) {
    this.bookmarksService.removeBookmark(activity.activity_id).subscribe(
      async (result: any) => {
        const toast = await this.toastCtrl.create({
          message: result.message,
          duration: 3000,
          color: 'primary',
        });
        await toast.present();
        let copy: any[] = [];
        copy = this.bookmarks.filter(
          (bookmark) => bookmark.activity_id !== activity.activity_id
        );
        this.bookmarks = copy;
      },
      async (error) => {
        console.error(error);
        const toast = await this.toastCtrl.create({
          message: 'Something went wrong. Please try again.',
          duration: 3000,
          color: 'primary',
        });
        await toast.present();
      }
    );
  }
}
