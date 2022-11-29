import { Component, OnInit } from '@angular/core';

import { ItemregisterService } from '../service/itemregister.service';
import { CategoriesService } from '../service/categories.service';
import { SubcategoriesService } from '../service/subcategories.service';

// Used to manage the Modal with dosmiss()
import { ModalController } from '@ionic/angular';
import { Item } from './item';

//Custom Modal
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-itemregister',
  templateUrl: './itemregister.page.html',
  styleUrls: ['./itemregister.page.scss'],
})
export class ItemregisterPage  {

  newItem = new Item();

  categories: any;
  newcategories: any;

  selectedSubcategory : any;

  
  subcategories: any;
  subnewcategories: any;
  
  cat: any[]
  subcat: any[]


  constructor(
    private itemregisterservice: ItemregisterService,
    private categoriesservice: CategoriesService, 
    private subcategoriesservice: SubcategoriesService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}
 
   getcategories(){
  // Get the information from the API using Observable
  // by subscribing to the studentservice Observable 
  this.categoriesservice.getData().subscribe(result => {
    this.categories = result['categories'];
    console.log(result);
   });
  }

getsubcategories(){
  // Get the information from the API using Observable
  // by subscribing to the studentservice Observable 
  this.subcategoriesservice.getData().subscribe(result => {
    this.subcategories = result['subcategories'];
    console.log(result);
   });
}

ngOnInit() {
  this.getcategories();
  this.getsubcategories();

}

setSelectedSubcategory(subcat:any) {
  this.selectedSubcategory = subcat.detail.value;
}

  // Method that uses the student create service to post data to the database via php
  addItem() {
    //console.log(this.newStudent);
    // Make a post request using the studentcreate service and subscribe to the
    // response in order to inform the user of the outcome. In this case, we just
    // go back to the previous page
    this.itemregisterservice.postData(this.newItem).subscribe(
      res => {
        console.log("Success: Record has been added" + res);
        this.dismiss(true);
      },
      async err => {
        console.log(err.message);
      }
    );
  }

// Now dismiss the modal and pass the created student back to
// the tab1 page so that we can add the student to the list
dismiss(returnItem: boolean) {
  if (returnItem) {
    this.modalCtrl.dismiss(this.newItem);
  } else {
    this.modalCtrl.dismiss();
  }
}
/* this code for dropdown bu it does not work
 *//* compareWith(o1, o2) {
  return o1 && o2 ? o1.id === o2.id : o1 === o2;
} */

/* compareFn(e1: subcat, e2: subcat): boolean {
  return e1 && e2 ? e1.id === e2.id : e1 === e2;
} */

private form = [
  {val: 'subcategories', isChecked: false},
  {val: 'categories', isChecked: false},
]

/* _getSelectedItem(selectedItem) {
  console.log('before'+ selectedItem.isChecked);
  this.subcategories .forEach(item=> {
    if(item.val == selectedItem.val ) {
      item.isChecked = selectedItem.isChecked
    }
  });
  console.log(this.subcategories )
  console.log(this.categories )
} */

}
