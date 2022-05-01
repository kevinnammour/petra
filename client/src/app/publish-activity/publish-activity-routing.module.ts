import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublishActivityPage } from './publish-activity.page';

const routes: Routes = [
  {
    path: '',
    component: PublishActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublishActivityPageRoutingModule {}
