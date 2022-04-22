/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  registerForm = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z]+$/),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=[a-zA-Z0-9._]{6,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    ])
  });

  // Password rules:
  // At least one upper case English letter, (?=.*?[A-Z])
  // At least one lower case English letter, (?=.*?[a-z])
  // At least one digit, (?=.*?[0-9])
  // At least one special character, (?=.*?[#?!@$%^&*-])
  // Minimum eight in length .{8,} (with the anchors)

  constructor(private route: Router) {}

  goToLandingPage() {
    this.route.navigate(['landing']);
  }

  goToLoginPage() {
    this.route.navigate(['login']);
  }

  ngOnInit() {}
}
