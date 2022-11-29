import { Component, OnInit } from '@angular/core';
import {
  combineAll,
  concatAll,
  flatMap,
  map,
  mergeAll,
  mergeMap,
  mergeMapTo,
  zipAll,
} from 'rxjs/operators';
//import İtems.service
import { ItemsService } from '../service/items.service';
import { SubcategoriesService } from '../service/subcategories.service';

import { from, merge } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

import { ToastController, LoadingController } from '@ionic/angular';

export interface subcategories {
  id: number;
  name: string;
}

export interface items {
  id: number;
  name: string;
  description: string;
  photos: string;
  categoryid: number;
  subcategory_id: number;
  icon: string;
}

/* export interface items{
  id:number;
  name:string;
  description:string;
  photos: string;

  icon:string
}  */

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  items: any;
  subcategories: any;
  subnewcategories: any;

  categoryId: any;
  // items$: Observable<items[]>;
  Subcategories: subcategories[] = [];
  // item: items[]= [ { 'id':0, 'name':'' , 'description': '', 'photos': '',   'icon': 'bag-outline' }];

  // hearthicon: string;
  //  hearthicon = this.items[0].icon

  //key-categoryName, for the header of the category
  categoryName: string;

  //(click)="addToCart(item)" - item is defined from the funtion
  // item = {'name':'', 'id':''};
  globalCart: any;
  studentId: any;
  cart = [{ name: '', photo: '', id: '', icon: 'bag-outline' }];

  // cart = [{'name':'','price':0, 'quantity':0, 'image':'', 'itemnumber':0, 'product_id':'','dis_price':0, 'topaid':0}];

  constructor(
    private itemservice: ItemsService,
    private subcategoriesservice: SubcategoriesService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    this.route.queryParams.subscribe((params) => {
      console.log('params are ', params);
      if (this.router.getCurrentNavigation().extras.state) {
        this.items = this.router.getCurrentNavigation().extras.state.items;
        console.log(this.items);
      }
    });
  }

  getsubcategories() {
    // Get the information from the API using Observable
    // by subscribing to the SubcategoriesService,
    //  Observable
    this.subcategoriesservice.getData().subscribe((result) => {
      this.subcategories = result;
      // this.subnewcategories = this.subcategories.subcategories;
      console.log(result);
    });
  }

  getitemData(categoryId): items[] {
    this.itemservice
      .getData()
      .subscribe((result) => {
        this.items = result['items'].filter((x) => x.categoryid == categoryId);
        // this.items = this.item.item;
        console.log(this.items);
        //console.log(this.items.filter(x => x.categoryid== 2));
      })
      .add(() => {
        this.storage
          .get('studentInfo')
          .then((info) => {
            console.log(info);
            this.studentId = info.id;
          })
          .then(() => {
            this.storage.get('cart').then((cart) => {
              //if the cart is there is no information (null),
              //initisiate the cart
              if (cart == null) {
                this.globalCart = {};
                this.cart = [];
                console.log(this.cart);
              }
              //if there is something in the cart, this cart is equal to cart
              else {
                this.globalCart = cart;
                this.cart = cart[this.studentId] || [];
                console.log(this.globalCart);
                console.log(this.cart);
              }
              // This codes are for showing up the ICON
              let cartIds = this.cart.map((item) => item.id);
              let cartIdsSet = new Set(cartIds);
              for (let item of this.items) {
                if (cartIdsSet.has(item.id)) {
                  item.icon = 'bag';
                } else {
                  item.icon = 'bag-outline';
                }
              }
              console.log(this.cart);
            });
          });
      });

    return this.items;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.categoryId = Number(params.get('id'));
      // 'name' - key,
      this.categoryName = params.get('name');
      console.log('category id ', this.categoryId);
      console.log('categoryName', this.categoryName);
    });

    this.getitemData(this.categoryId);

    this.getsubcategories();

    // this.storage.clear();
  }
  // to get the item info, a
  async addToCart(i) {
    // console.log ("added to cart");
    //assinged the item as variables
    console.log(i.name);

    for (let [index, item] of this.cart.entries()) {
      if (item.id === i.id) {
        i.icon = 'bag-outline';
        this.cart.splice(index, 1);
        this.globalCart[this.studentId] = this.cart;
        this.storage.set('cart', this.globalCart);
        console.log(this.cart);
        this.loading(i.name + 'removed to Cart');
        return;
      }
    }
    i.icon = 'bag';
    this.cart.push(i);
    this.globalCart[this.studentId] = this.cart;
    this.storage.set('cart', this.globalCart);
    console.log(this.cart);
    this.loading(i.name + 'added to Cart');
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
        item: item,
      },
    };
    this.router.navigate(['product-detail'], navigationExtras);
  }
}
