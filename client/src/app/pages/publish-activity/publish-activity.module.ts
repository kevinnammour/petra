import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublishActivityPageRoutingModule } from './publish-activity-routing.module';

import { PublishActivityPage } from './publish-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublishActivityPageRoutingModule
  ],
  declarations: [PublishActivityPage]
})
export class PublishActivityPageModule {}
