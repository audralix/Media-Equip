import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IntroPageRoutingModule } from './intro-routing.module';

import { IntroPage } from './intro.page';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroPageRoutingModule,
    SharedDirectivesModule,
    RouterModule.forChild([{
      path:'',
      component: IntroPage
    }])
  ],
  declarations: [IntroPage]
})
export class IntroPageModule {}
