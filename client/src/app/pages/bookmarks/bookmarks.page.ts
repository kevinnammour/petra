import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
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
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
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
      console.log(res);
    });
    this.image = localStorage.getItem('image');
  }

  async showOwnerInfo(activity: any) {
    const alert = await this.alertCtrl.create({
      message: `<p><span>Name: </span><span>${activity.full_name}</span></p>
      <p><span>Country: </span><span>${activity.country}</span></p>
      <p><span>Gender: </span><span>${activity.gender}</span></p>
      <p><span>Whatsapp: </span><span>${activity.whatsapp}</span></p>
      <p><span>Facebook: </span><span>${activity.facebook}</span></p>
      <p><span>Instgram: </span><span>${activity.instagram}</span></p>
      <p><span>Tiktok: </span><span>${activity.tiktok}</span></p>`,
      buttons: ['Close'],
      cssClass: 'alert-msg',
    });
    await alert.present();
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
