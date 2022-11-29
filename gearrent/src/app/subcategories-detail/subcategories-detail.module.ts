import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubcategoriesDetailPageRoutingModule } from './subcategories-detail-routing.module';

import { SubcategoriesDetailPage } from './subcategories-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubcategoriesDetailPageRoutingModule
  ],
  declarations: [SubcategoriesDetailPage]
})
export class SubcategoriesDetailPageModule {}
