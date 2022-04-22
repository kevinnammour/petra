import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginUrl = 'http://localhost/petra/server/apis/auth/signin.php';

  loginForm = new FormGroup({
    emailorusername: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: Router,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
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

    this.http.post(`${this.loginUrl}`, this.loginForm.value).subscribe(
        async () => {
          loading.dismiss();
          this.route.navigate(['home']);
        },
        async () => {
          const alert = await this.alertCtrl.create({message: 'Login Failed', buttons: ['OK']});
          await alert.present();
          loading.dismiss();
        },
      );
  }

  ngOnInit() {}
}
