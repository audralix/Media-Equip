import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
// With our directives in place we now need to load the module which exports the directives in the module where we plan to use them
import { SharedDirectivesModule } from '../directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedDirectivesModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
