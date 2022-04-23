import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { InputModule } from '../components/input/input.module';

import { SwiperModule } from 'swiper/angular';
import { SearchModalComponent } from '../components/search-modal/search-modal.component';

import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputModule,
    SwiperModule,
    HomePageRoutingModule,
    HttpClientModule,
  ],
  declarations: [HomePage, SearchModalComponent],
  entryComponents: [SearchModalComponent],
})
export class HomePageModule {}
