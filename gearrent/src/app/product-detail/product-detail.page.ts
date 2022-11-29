import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DescriptionService } from '../service/description.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  item: any;

  cart = [{ name: '', photo: '', id: '', icon: 'bag-outline' }];

  globalCart: any;
  studentId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private toastCtrl: ToastController,

    private descriptionService: DescriptionService
  ) {
    /* Passing Data: This is achieved by using the ActivatedRoute class to access the
      router State tree and extract the information from it */
    /*Passing Data: The ActivateRoute Interface class is used to not only provide the
     receiving component with data but to observe any changes that may
     have occurred since the initial call */

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.item = this.router.getCurrentNavigation().extras.state.item;
        console.log(this.item);
      }
    });
  }
  ngOnInit() {
    console.log(this.item);
    this.storage
      .get('studentInfo')
      .then((info) => {
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
          let cartIds = this.cart.map((item) => item.id);
          let cartIdsSet = new Set(cartIds);
        });
      });
    this.descriptionService.getData(this.item.id).subscribe((result) => {
      console.log(result);
      this.item.description = result['items'][0]['description'];
    });
  }

  addToCart(i) {
    // console.log ("added to cart");
    //assinged the item as variables
    console.log(i.name);
    //created cart variable
    //'cart' is name of the variable

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
    //setting the cart
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
}
