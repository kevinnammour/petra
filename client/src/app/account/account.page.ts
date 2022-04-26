import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'app/apis/account/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage {

  constructor(private router: Router, private accountService: AccountService) { }

  goHome() {
    this.router.navigate(['/home']);
  }

  ionViewDidEnter() {
    console.log('Hello');
    this.accountService.getPersonalInformation().subscribe(console.log);
  }
}
