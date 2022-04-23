import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent implements OnInit {
  // searchForm = new FormGroup({
  //   location: new FormControl('', [Validators.required]),
  //   min: new FormControl('', [Validators.required]),
  //   max: new FormControl('', [Validators.required]),
  //   activities: new FormControl('', [Validators.required]),
  // });

  constructor(
    private modalCtrl: ModalController,
    private route: Router,
    private http: HttpClient
  ) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {}
}
