/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ActivitiesService } from 'app/apis/home/activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage {
  activities: any[] = [];
  constructor(
    private router: Router,
    private activitiesService: ActivitiesService,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  returnToSearchPage() {
    this.router.navigate(['search']);
  }

  async bookmark(activity: any) {
    this.activitiesService.bookmark(activity.activity_id).subscribe(
      async (result: any) => {
        const toast = await this.toastCtrl.create({
          message: result.message,
          duration: 3000,
          color: 'primary',
        });
        await toast.present();
      },
      async (error) => {
        console.error(error);
        const toast = await this.toastCtrl.create({
          message: 'Activity already bookmarked.',
          duration: 3000,
          color: 'primary',
        });
        await toast.present();
      }
    );
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

  ionViewDidEnter() {
    const filters: any = {
      min: localStorage.getItem('min'),
      max: localStorage.getItem('max'),
      location: localStorage.getItem('location'),
      categories: localStorage.getItem('activities'),
    };

    this.activitiesService.searchActivities(filters).subscribe(
      async (res: any) => {
        this.activities = res;
      },
    );
  }
}
