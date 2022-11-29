import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AchievePageRoutingModule } from './achieve-routing.module';

import { AchievePage } from './achieve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AchievePageRoutingModule
  ],
  declarations: [AchievePage]
})
export class AchievePageModule {}
