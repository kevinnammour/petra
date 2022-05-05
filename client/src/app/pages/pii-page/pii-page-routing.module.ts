import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PiiPagePage } from './pii-page.page';

const routes: Routes = [
  {
    path: '',
    component: PiiPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PiiPagePageRoutingModule {}
