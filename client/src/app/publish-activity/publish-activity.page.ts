import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ActivitiesService, Feature } from 'app/apis/home/activities.service';
import { AccountService } from 'app/apis/account/account.service';

@Component({
  selector: 'app-publish-activity',
  templateUrl: './publish-activity.page.html',
  styleUrls: ['./publish-activity.page.scss'],
})
export class PublishActivityPage {
  addresses: string[] = [];
  selectedAddress = null;
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private mapboxService: ActivitiesService,
    private accountService: AccountService,
    private toastCtrl: ToastController,
  ) {}

  returnAccountPage() {
    this.router.navigate(['/account']);
  }

  async submitActivity(form: NgForm) {
    if (
      form.value.location === '' ||
      form.value.category === '' ||
      form.value.description === '' ||
      form.value.price === ''
    ) {
      const alert = await this.alertCtrl.create({
        message: 'Please fill in the form properly.',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      this.accountService.addActivity(form.value).subscribe(
        async (result: any) => {
          const toast = await this.toastCtrl.create({
            message: result.message,
            duration: 3000,
            color: 'primary',
          });
          await toast.present();
          form.reset();
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

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService
        .search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          this.addresses = features.map((feat) => feat.place_name);
        });
    } else {
      this.addresses = [];
    }
  }

  onSelect(address: string) {
    this.selectedAddress = address;
    this.addresses = [];
  }
}
