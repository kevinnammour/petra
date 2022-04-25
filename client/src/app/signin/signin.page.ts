import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SigninService } from 'app/apis/signin.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  loginForm = new FormGroup({
    emailorusername: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: Router,
    private http: HttpClient,
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

  goToHomePage() {
    this.route.navigate(['home']);
  }

  async login() {
    const loading = await this.loadingCtrl.create({ message: 'Logging in...' });
    await loading.present();

    this.signinService.signin(this.loginForm.value).subscribe(
      async (token) => {
        localStorage.setItem('token', token);
        loading.dismiss();
        this.loginForm.reset();
        this.route.navigate(['home']);
      },
      async () => {
        const alert = await this.alertCtrl.create({
          message: 'Login Failed',
          buttons: ['OK'],
        });
        await alert.present();
        loading.dismiss();
      }
    );
  }
  ngOnInit() {}
}
