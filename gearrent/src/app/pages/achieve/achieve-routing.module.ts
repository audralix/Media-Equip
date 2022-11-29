import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AchievePage } from './achieve.page';

const routes: Routes = [
  {
    path: '',
    component: AchievePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AchievePageRoutingModule {}
