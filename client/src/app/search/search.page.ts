/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ActivitiesService, Feature } from 'app/apis/activities.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  addresses: string[] = [];
  selectedAddress = null;
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private mapboxService: ActivitiesService
  ) {}

  ngOnInit() {}

  returnToHomepage() {
    this.router.navigate(['/home']);
  }

  async searchActivities(form: NgForm) {
    if (
      form.value.location !== this.selectedAddress ||
      form.value.location === ''
    ) {
      const alert = await this.alertCtrl.create({
        message:
          'Please select a location that is suggested in the dropdown of the search bar.',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      if (form.value.min > form.value.max) {
        const alert = await this.alertCtrl.create({
          message:
            'Range of the budget is negative. Please specify a valid range.',
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }
      localStorage.setItem('min', form.value.min);
      localStorage.setItem('max', form.value.max);
      localStorage.setItem('location', form.value.location);
      localStorage.setItem('activities', form.value.activities);
      this.router.navigate(['activities']);
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
