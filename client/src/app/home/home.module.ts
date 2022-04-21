import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { InputModule } from '../components/input/input.module';

import { SwiperModule } from 'swiper/angular';
import { SearchModalComponent } from '../components/search-modal/search-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputModule,
    SwiperModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, SearchModalComponent],
  entryComponents: [SearchModalComponent]
})
export class HomePageModule {}
