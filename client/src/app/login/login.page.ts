import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private route: Router) {}

  goToLandingPage() {
    this.route.navigate(['landing']);
  }

  goToSignUpPage() {
    this.route.navigate(['signup']);
  }

  goToHomePage() {
    this.route.navigate(['home']);
  }

  ngOnInit() {}
}
