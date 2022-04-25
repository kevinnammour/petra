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
      activities: localStorage.getItem('activities'),
    };

    console.log(filters);

    this.http
      .get('http://localhost/petra/server/apis/home/search.php', {params: filters})
      .subscribe(console.log);
  }
}
