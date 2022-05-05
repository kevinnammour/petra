import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AccountService } from 'app/apis/account/account.service';
import { Pii } from 'app/apis/account/account.service';

@Component({
  selector: 'app-pii-page',
  templateUrl: './pii-page.page.html',
  styleUrls: ['./pii-page.page.scss'],
})
export class PiiPagePage {
  // fullname = null;
  // username = null;
  // country = null;
  // gender = null;
  // whatsapp = null;
  // instagram = null;
  // facebook = null;
  // tiktok = null;
  image = null;
  pii: Pii = null;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  returnAccountPage() {
    this.router.navigate(['/account']);
  }

  ionViewDidEnter() {
    this.image = localStorage.getItem('image');
    this.accountService.getPersonalInformation().subscribe(
      (res: Pii) => {
        this.pii = res;
      },
      async (error) => {
        const alert = await this.alertCtrl.create({
          message: 'Something went wrong, please go back and come again!',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  async savePii(form: NgForm) {
    if (
      !form.value.fullname.match(
        /^[\w'\-,.][^0-9_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/
      )
    ) {
      const alert = await this.alertCtrl.create({
        message: 'Full name structure is invalid.',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      this.accountService.savePersonalInformation(form.value).subscribe(
        async (res: any) => {
          const toast = await this.toastCtrl.create({
            message: res.message,
            duration: 3000,
            color: 'primary',
          });
          await toast.present();
        },
        async (error) => {
          const toast = await this.toastCtrl.create({
            message: 'Something went wrong, please try again.',
            duration: 3000,
            color: 'primary',
          });
          await toast.present();
        }
      );
    }
  }
}
