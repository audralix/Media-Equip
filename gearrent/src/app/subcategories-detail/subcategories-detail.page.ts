import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DescriptionService } from '../service/description.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { Item } from '../itemregister/item';

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
  selector: 'app-subcategories-detail',
  templateUrl: './subcategories-detail.page.html',
  styleUrls: ['./subcategories-detail.page.scss'],
})
export class SubcategoriesDetailPage implements OnInit {
  groupsArray: any;

  items: any;
  item: any;

  value: any;

  globalCart: any;
  studentId: any;

  cart = [{ name: '', photo: '', id: '', icon: 'bag-outline' }];

  subcategoryName: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private descriptionService: DescriptionService,
    private toastCtrl: ToastController
  ) {
    /* Passing Data: This is achieved by using the ActivatedRoute class to access the
      router State tree and extract the information from it */
    /*Passing Data: The ActivateRoute Interface class is used to not only provide the
     receiving component with data but to observe any changes that may
     have occurred since the initial call */

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.items = this.router.getCurrentNavigation().extras.state.kit;
        console.log(this.items);
        this.getDescription();
      }
    });
  }

  async ngOnInit() {
    /*  let newItems = [];
    for await (let item of this.items) {
      this.descriptionService.getData(item.id).subscribe((result) => {
        console.log(result);
        item.description = result['items'][0]['descripition'];
        newItems.push(item);
      });
    } */
    this.getDescription().then((items) => {
      console.log(items);
      this.items = items;
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
                console.log(this.globalCart);
              }
              let cartIds = this.cart.map((item) => item.id);
            })
            .then(() => {
              // This codes are for showing up the ICON
              let cartIds = this.cart.map((item) => {
                console.log(item);
                return item.id;
              });
              let cartIdsSet = new Set(cartIds);
              console.log(cartIds);

              /*for (let kit of this.items) {
              console.log(kit);
              for (let item of kit) {
                if (cartIdsSet.has(item.id)) {
                  console.log(item.id);
                  kit.icon = 'bag';
                } else {
                  kit.icon = 'bag-outline';
                }
              }
            } */
              console.log(this.cart);
            });
        });
    });
    /* this.items.forEach((item) => {
      this.descriptionService.getData(item.id).subscribe((result) => {
        console.log(result);
        item.description = result['items'][0]['descripition'];
      });
    }); */

    /*    this.descriptionService.getData(this.item.id).subscribe((result) => {
      console.log(result);
      this.item.description = result['items'][0]['descripition'];
    }); */

    // return this.items;
  }

  getDescription() {
    return new Promise((resolve, reject) => {
      this.items.forEach((item, index, array) => {
        this.descriptionService.getData(item.id).subscribe((result) => {
          item.description = result['items'][0]['description'];
        });
        console.log(item);
      });
      resolve(this.items);
    });
  }

  addToCart(i, items) {
    console.log(i);
    console.log(i.name);

    for (let [index, item] of this.cart.entries()) {
      if (item.id === i.id) {
        i.icon = 'bag-outline';
        items.icon = 'bag-outline';
        this.cart.splice(index, 1);
        this.globalCart[this.studentId] = this.cart;
        this.storage.set('cart', this.globalCart);
        console.log(this.cart);
        this.loading(i.name + 'removed to Cart');

        return;
      }
    }
    i.icon = 'bag';
    items.icon = 'bag';
    this.cart.push(i);
    this.globalCart[this.studentId] = this.cart;
    this.storage.set('cart', this.globalCart);
    console.log(this.cart);
    this.loading(i.name + i.name + 'added to Cart');
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

  addKitToCart(items) {
    for (let item of items) {
      this.addToCart(item, items);
    }
  }
}
