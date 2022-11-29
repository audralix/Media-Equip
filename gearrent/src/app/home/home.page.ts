import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

// Import the studentdata service
import { CategoriesService } from '../service/categories.service';
import { SubcategoriesService } from '../service/subcategories.service';
//Modal
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AddupdatemodalPage } from '../addupdatemodal/addupdatemodal.page';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  categories: any;
  newcategories: any;

  subcategories: any;
  subnewcategories: any;

  private selectedSegment: string = 'friends';

  choice = 'Credit Card';

  //it will grab the current user
  // user = this.authService.getUser();

  user = this.authService.getUser();

  // Pass instance of StudentDataService into constructor
  constructor(
    private router: Router,
    private categoriesservice: CategoriesService,
    private subcategoriesservice: SubcategoriesService,

    private modalCtrl: ModalController,

    private authService: AuthService
  ) {}

  getcategoriesData() {
    // Get the information from the API using Observable
    // by subscribing to the studentservice Observable
    this.categoriesservice.getData().subscribe((result) => {
      this.categories = result;
      console.log(this.categories);
      this.newcategories = this.categories.categories;
      console.log(this.newcategories);
    });
  }

  getsubcategories() {
    // Get the information from the API using Observable
    // by subscribing to the studentservice Observable
    this.subcategoriesservice.getData().subscribe((result) => {
      this.subcategories = result;
      console.log(this.subcategories);
      this.subnewcategories = this.subcategories.subcategories;
    });
  }

  ngOnInit() {
    this.getcategoriesData();
    console.log(this.categories);
    this.getsubcategories();
    console.log(this.subcategories);
  }
  //TABS: categories and subcategories
  segmentChanged(event: any) {
    console.log(event.target.value);
    this.selectedSegment = event.target.value;
  }

  //Modal
  // you have to set the breakpoints and initialBreakpoints value when creating the modal.
  // When the modal comes up, it will open initially to the initialBreakpoint, which needs to be one value that you’ve added to the array of breakpoints.

  async presentModal() {
    const mySubject = new BehaviorSubject(this.choice);

    /*    const modal = await this.modalCtrl.create({
      component: AddmodalPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5
    }); */

    const modal = await this.modalCtrl.create({
      component: AddupdatemodalPage,
      breakpoints: [0, 0.2],
      initialBreakpoint: 0.2,
      handle: false,
      componentProps: {
        mySubject,
      },
    });

    await modal.present();

    mySubject.subscribe((value: string) => {
      this.choice = value;
    });

    modal.onDidDismiss().then((_) => {
      mySubject.unsubscribe();
    });
  }

  openpage(categoryId, categoryName, items: any) {
    // Create Navigation Extras object to pass to details page
    // This is passed into openPage from home.page.html
    let navigationExtras: NavigationExtras = {
      state: {
        items: items,
      },
    };

    console.log('items are ', items);

    /* Passing Data: The state data is passed in a NavigationExtras objects as a state
   property, which in turn is is passed into the navigate method of the
    router object */
    this.router.navigate(
      ['camera', { id: categoryId, name: categoryName }],
      navigationExtras
    );
  }

  opensubitems(subcategoryId, subcategoryName, items: any) {
    // Create Navigation Extras object to pass to details page
    // This is passed into openPage from home.page.html
    let navigationExtras: NavigationExtras = {
      state: {
        items: items,
      },
    };

    console.log('items are ', items);

    /* Passing Data: The state data is passed in a NavigationExtras objects as a state
   property, which in turn is is passed into the navigate method of the
    router object */
    this.router.navigate(
      ['subcategories', { id: subcategoryId, name: subcategoryName }],
      navigationExtras
    );
  }
}
