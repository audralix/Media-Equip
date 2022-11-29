import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemregisterPageRoutingModule } from './itemregister-routing.module';

import { ItemregisterPage } from './itemregister.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemregisterPageRoutingModule
  ],
  declarations: [ItemregisterPage]
})
export class ItemregisterPageModule {}
