import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubcategoriesDetailPage } from './subcategories-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SubcategoriesDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubcategoriesDetailPageRoutingModule {}
