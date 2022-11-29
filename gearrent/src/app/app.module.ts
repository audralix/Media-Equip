import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClient,HttpClientModule } from '@angular/common/http';

// import { IonicStorageModule } from '@ionic/storage-angular';

// import { IonicStorageModule  } from '@ionic/storage-angular';
// import { Storage } from '@ionic/storage-angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { GlobalProvider } from './globalpro';

import { RegisterPageModule } from './register/register.module';

import { FormsModule } from '@angular/forms';
// import { HasRoleDirective } from './directives/has-role.directive';
//for animation

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    
  
     IonicModule.forRoot({}), 
     AppRoutingModule,
     HttpClientModule,
     IonicStorageModule.forRoot({ }),
     RegisterPageModule,
     FormsModule ],
  providers: [ GlobalProvider, HttpClient, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  

  
})
export class AppModule {}
