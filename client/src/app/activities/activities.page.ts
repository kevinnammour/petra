import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ActivitiesService } from 'app/apis/activities/activities.service';

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

  ionViewDidEnter() {
    const filters: any = {
      min: localStorage.getItem('min'),
      max: localStorage.getItem('max'),
      location: localStorage.getItem('location'),
      categories: localStorage.getItem('activities'),
    };

    console.log(filters);

    this.http
      .get('http://localhost/petra/server/apis/home/search.php', {
        params: filters,
      })
      .subscribe((res: any) => {
        this.activities = res;
      });
  }
}
