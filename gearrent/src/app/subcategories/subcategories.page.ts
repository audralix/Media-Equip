import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../service/items.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { KitService } from '../service/kit.service';

import { Storage } from '@ionic/storage';

import { ToastController, LoadingController } from '@ionic/angular';

//export it before the component
export interface items {
  id: number;
  name: string;
  description: string;
  photos: string;
  categoryid: number;
  subcategory_id: number;
  kitid: number;
}

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.page.html',
  styleUrls: ['./subcategories.page.scss'],
})
export class SubcategoriesPage implements OnInit {
  subcategoryId: any;
  kitId: any;
  items: any[];

  //kit: any;

  //key-subcategoryName, for the header of the subcategory
  subcategoryName: string;

  globalCart: any;
  studentId: any;

  cart = [{ name: '', photo: '', id: '' }];

  constructor(
    private itemservice: ItemsService,
    private kitservice: KitService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    /*    this.route.queryParams.subscribe((params) => {
      console.log('params are ', params);
      if (this.router.getCurrentNavigation().extras.state) {
        this.items = this.router.getCurrentNavigation().extras.state.items;
        console.log(this.items);
      }
    }); */
  }

  // Resource code: https://learnwithparam.com/blog/how-to-group-by-array-of-objects-using-a-key/
  // Accepts the array and key
  groupArrayOfObjects(array, key): {} {
    // Resource: https://www.w3schools.com/jsref/jsref_reduce.asp
    // Syntax: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
    //Reducer function parameters: currentValue	Required.The value of the current element.
    // Return the end result
    return array.reduce(function (result, currentValue) {
      // If an array already present for key, push it to the array. Else create an array and push the object
      // The push() method adds new items to the end of an array. (https://www.w3schools.com/jsref/jsref_push.asp)
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {}); // empty object is the initial value for result object
  }

  getitemdata(subcategoryId): any[] {
    this.itemservice
      .getData()
      .subscribe((result) => {
        this.items = result['items'].filter(
          (y) => y.subcategory_id == subcategoryId
        );
        //kitid is from item table
        let groupedItemsByKitId = this.groupArrayOfObjects(this.items, 'kitid');

        console.log(groupedItemsByKitId);
        // this.items=result['items'].filter(z => z.kitId == kitId);
        let groupsArray = [];
        if (groupedItemsByKitId[0]) {
          groupedItemsByKitId[0].forEach((item) => groupsArray.push([item]));
          delete groupedItemsByKitId[0];
        }

        Object.values(groupedItemsByKitId).forEach((value) =>
          groupsArray.unshift(value)
        );
        this.items = groupsArray;

        console.log(groupsArray);
        console.log(this.items);
        // console.log(this.items.filter(z => z.kitid== 1));
      })
      .add(() => {
        this.storage
          .get('studentInfo')
          .then((info) => {
            console.log(info);
            this.studentId = info.id;
          })
          .then(() => {
            this.storage
              .get('cart')
              .then((cart) => {
                if (cart == null) {
                  this.globalCart = {};
                  this.cart = [];
                  console.log(this.cart);
                }
                //if there is something in the cart, this cart is equal to cart
                else {
                  this.globalCart = cart;
                  this.cart = cart[this.studentId] || [];
                  console.log(this.cart);
                }
              })
              .then(() => {
                // This codes are for showing up the ICON
                let cartIds = this.cart.map((item) => {
                  console.log(item);
                  return item.id;
                });
                let cartIdsSet = new Set(cartIds);
                console.log(cartIds);
                for (let kit of this.items) {
                  console.log(kit);
                  for (let item of kit) {
                    if (cartIdsSet.has(item.id)) {
                      console.log(item.id);
                      kit.icon = 'bag';
                    } else {
                      kit.icon = 'bag-outline';
                    }
                  }
                }
                console.log(this.cart);
              });
          });
      });

    return this.items;
  }

  /*  getkitdata([{ kid: kitId }]): items[]{
    this.itemservice.getData().
    subscribe(result => {
      this.items=result['items'].filter(z => z.kitid == kitId);
      console.log(this.items);
      // console.log(this.items.filter(x => x.subcategory_id== 4));
    });
    return this.items;
  }  */

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.subcategoryId = Number(params.get('id'));
      this.subcategoryName = params.get('name');
      console.log('name', this.subcategoryName);
      // this.kitId = Number(params.get('subcategory_id'));
      console.log('subcategory id ', this.subcategoryId);
      //  this.kitId = Number(params.get('kitid'));
    }),
      this.route.paramMap.subscribe((params) => {
        this.kitId = Number(params.get('kitid'));
      }),
      this.getitemdata(this.subcategoryId);
    console.log('kit id ', this.kitId);
  }
  // to get the item info, a
  addToCart(kit, i) {
    console.log('added to cart');
    //assinged the item as variables
    console.log(i);
    console.log(i.name);

    for (let [index, item] of this.cart.entries()) {
      if (item.id === i.id) {
        i.icon = 'bag-outline';
        kit.icon = 'bag-outline';
        this.cart.splice(index, 1);
        this.globalCart[this.studentId] = this.cart;
        this.storage.set('cart', this.globalCart);
        console.log(this.cart);
        this.loading(i.name + 'removed to Cart');

        return;
      }
    }
    i.icon = 'bag';
    kit.icon = 'bag';
    this.cart.push(i);
    this.globalCart[this.studentId] = this.cart;
    this.storage.set('cart', this.globalCart);
    console.log(this.cart);
    this.loading(i.name + 'added to Cart');
  }

  addKitToCart(kit) {
    for (let item of kit) {
      this.addToCart(kit, item);
    }
  }

  loading(msg) {
    this.toastCtrl
      .create({
        message: msg,
        duration: 500,
        color: 'primary',
      })
      .then((toast) => toast.present());
  }

  //to open the Product Detail Page
  productDetail(item: any) {
    // Create Navigation Extras object to pass to details page
    // This is passed into openPage from home.page.html
    let navigationExtras: NavigationExtras = {
      state: {
        kit: item,
      },
    };
    this.router.navigate(['subcategories-detail'], navigationExtras);
  }
}
