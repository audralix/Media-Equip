import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
// import { CartService } from './service/cart.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(private storage: Storage,
      // private cartservice: CartService
      ) {
        // this.cartservice.init();
      }

    // https://www.anycodings.com/1questions/1435114/error-error-database-not-created-must-call-create-first
    async ngOnInit() {
      // If using a custom driver:
      // await this.storage.defineDriver(MyCustomDriver)
      await this.storage.create();
    }
    
}
