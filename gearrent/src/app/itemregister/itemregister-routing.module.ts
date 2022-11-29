import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemregisterPage } from './itemregister.page';

const routes: Routes = [
  {
    path: '',
    component: ItemregisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemregisterPageRoutingModule {}
