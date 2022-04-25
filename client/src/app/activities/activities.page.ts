import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivitiesService } from 'app/apis/activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {
  activities: any[] = [];
  constructor(
    private router: Router,
    private activitiesService: ActivitiesService,
    private http: HttpClient
  ) {}

  returnToSearchPage() {
    this.router.navigate(['search']);
  }

  ngOnInit() {
    const filters: any = {
      min: localStorage.getItem('min'),
      max: localStorage.getItem('max'),
      location: localStorage.getItem('location'),
      categories: localStorage.getItem('activities'),
    };

    this.http
      .get('http://localhost/petra/server/apis/home/search.php', {params: filters})
      .subscribe((res: any) => {
        this.activities = res;
        console.log(this.activities);
      });
  }
}
