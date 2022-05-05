import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SigninService } from 'app/apis/auth/signin.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  constructor(
    private route: Router,
    private signinService: SigninService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  goToLandingPage() {
    this.route.navigate(['landing']);
  }

  goToSignUpPage() {
    this.route.navigate(['signup']);
  }

  genRand(len: any) {
    return Math.random()
      .toString(36)
      .substring(2, len + 2);
  }

  async login(form: NgForm) {
    const loading = await this.loadingCtrl.create({ message: 'Logging in...' });
    await loading.present();

    this.signinService.signin(form.value).subscribe(
      async (token) => {
        localStorage.setItem('token', token);
        loading.dismiss();
        form.reset();
        localStorage.setItem('image', this.genRand(8));
        this.route.navigate(['home']);
      },
      async () => {
        const alert = await this.alertCtrl.create({
          message: 'Incorrect credentials',
          buttons: ['Try again'],
        });
        await alert.present();
        loading.dismiss();
      }
    );
  }
  ngOnInit() {}
}
