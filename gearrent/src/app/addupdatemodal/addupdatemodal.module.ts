import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddupdatemodalPageRoutingModule } from './addupdatemodal-routing.module';

import { AddupdatemodalPage } from './addupdatemodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddupdatemodalPageRoutingModule
  ],
  declarations: [AddupdatemodalPage]
})
export class AddupdatemodalPageModule {}
