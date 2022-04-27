import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  dob = null;
  country = null;
  gender = null;
  constructor(private router: Router, private accountService: AccountService, private alertCtrl: AlertController) {}

  returnAccountPage() {
    this.router.navigate(['/account']);
  }

  ionViewDidEnter() {
    this.accountService.getPersonalInformation().subscribe(
      (result: any) => {
        console.log(result);
        this.fullname = result.full_name;
        this.username = result.username;
        this.email = result.email;
        this.country = result.country;
        this.gender = result.gender;
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
    console.log(form.value);
  }
}
