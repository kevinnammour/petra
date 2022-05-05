/* eslint-disable max-len */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SignupService } from 'app/apis/auth/signup.service';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  constructor(
    private route: Router,
    private signupService: SignupService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  goToLandingPage() {
    this.route.navigate(['landing']);
  }

  goToLoginPage() {
    this.route.navigate(['signin']);
  }

  async register(form: NgForm) {
    if (
      form?.value?.fullname === '' ||
      form?.value?.username === '' ||
      form?.value?.password === ''
    ) {
      const alert = await this.alertCtrl.create({
        message: 'All fields are required',
        buttons: ['Ok'],
      });
      await alert.present();
    } else if (
      !/^[\w'\-,.][^0-9_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/.test(
        form.value.fullname
      )
    ) {
      const alert = await this.alertCtrl.create({
        message: 'Full name not valid',
        buttons: ['Ok'],
      });
      await alert.present();
    } else if (
      !/^(?=[a-zA-Z0-9._]{6,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(
        form.value.username
      )
    ) {
      const alert = await this.alertCtrl.create({
        message: 'Username not valid',
        buttons: ['Ok'],
      });
      await alert.present();
    } else if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        form.value.password
      )
    ) {
      const alert = await this.alertCtrl.create({
        message:
          'Your password must have at least one upper case English letter, one lower case English letter, one digit, one special character, and a minimum of 8 characters',
        buttons: ['Ok'],
      });
      await alert.present();
    } else {
      const loading = await this.loadingCtrl.create({
        message: `Registering...`,
      });
      await loading.present();

      this.signupService.signup(form.value).subscribe(
        async () => {
          // check the status code in here
          const toast = await this.toastCtrl.create({
            message: `Account created`,
            duration: 2500,
            color: 'primary',
          });
          await toast.present();
          loading.dismiss();
          form.reset();
          this.route.navigate(['/signin']);
        },
        async (err) => {
          const alert = await this.alertCtrl.create({
            message:
              err?.status === 409
                ? `Username already exists!`
                : `Account creation failed`,
            buttons: ['Ok'],
          });
          await alert.present();
          loading.dismiss();
        }
      );
    }
  }
}
