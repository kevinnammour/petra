import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AccountService } from 'app/apis/account/account.service';

@Component({
  selector: 'app-pii-page',
  templateUrl: './pii-page.page.html',
  styleUrls: ['./pii-page.page.scss'],
})
export class PiiPagePage {
  fullname = null;
  username = null;
  email = null;
  country = null;
  gender = null;
  whatsapp = null;
  instagram = null;
  facebook = null;
  tiktok = null;
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
    this.accountService.getPersonalInformation().subscribe(
      (result: any) => {
        this.fullname = result.full_name;
        this.username = result.username;
        this.email = result.email;
        this.country = result.country;
        this.gender = result.gender;
        this.whatsapp = result.whatsapp;
        this.instagram = result.instagram;
        this.facebook = result.facebook;
        this.tiktok = result.tiktok;
      },
      async (error) => {
        const alert = await this.alertCtrl.create({
          message: 'Not all information were brought successfully',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  async savePii(form: NgForm) {
    if (
      form.value.fullname === this.fullname &&
      form.value.country === this.country &&
      form.value.gender === this.gender &&
      form.value.whatsapp === this.whatsapp &&
      form.value.facebook === this.facebook &&
      form.value.instagram === this.instagram &&
      form.value.tiktok === this.tiktok
    ) {
      const alert = await this.alertCtrl.create({
        message: 'No changes were detected.',
        buttons: ['OK'],
      });
      await alert.present();
    } else if (
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
        async (result: any) => {
          const toast = await this.toastCtrl.create({
            message: result.message,
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
