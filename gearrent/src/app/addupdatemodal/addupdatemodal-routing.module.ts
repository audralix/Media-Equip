import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddupdatemodalPage } from './addupdatemodal.page';

const routes: Routes = [
  {
    path: '',
    component: AddupdatemodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddupdatemodalPageRoutingModule {}
