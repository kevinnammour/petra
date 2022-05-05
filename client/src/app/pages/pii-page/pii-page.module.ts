import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PiiPagePageRoutingModule } from './pii-page-routing.module';

import { PiiPagePage } from './pii-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PiiPagePageRoutingModule
  ],
  declarations: [PiiPagePage]
})
export class PiiPagePageModule {}
