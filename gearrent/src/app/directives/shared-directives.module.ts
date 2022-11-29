import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisableRoleDirective } from './disable-role.directive';
import { HasPermissionDirective } from './has-permission.directive';

@NgModule({
  declarations: [HasPermissionDirective, DisableRoleDirective],
  imports: [
    CommonModule
  ],
  exports: [HasPermissionDirective, DisableRoleDirective]
})
export class SharedDirectivesModule { }
