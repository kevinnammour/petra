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
  country = null;
  gender = null;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private alertCtrl: AlertController
  ) {}

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
    if (
      form.value.fullname === this.fullname &&
      form.value.country === this.country &&
      form.value.gender === this.gender
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
      this.accountService.savePersonalInformation();
    }
  }
}
