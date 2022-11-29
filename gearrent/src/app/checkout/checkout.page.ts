import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { parseISO, format } from 'date-fns';
import { GlobalProvider } from '../globalpro';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Item } from '../itemregister/item';
import { Order } from './order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  shipping_formGroup: FormGroup;
  shippingMethod: Array<string>;
  paymentMethod: Array<string>;
  session_id: any;

  // startDate: Date;
  // endDate: Date;

  startDate = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
  endDate = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';

  formattedstartDate = '';
  formattedendDate = '';

  cart: any[];
  globalCart: any;

  studentInfo: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private global: GlobalProvider,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage
  ) {
    this.setToday();
  }

  setToday() {
    this.formattedstartDate = format(parseISO(this.startDate), ' MMM d, yyyy');
    this.formattedendDate = format(parseISO(this.endDate), ' MMM d, yyyy');
  }

  ngOnInit() {
    /*ParamMap: A map that provides access to the required and optional parameters specific to a route. 
    //The map supports retrieving a single value with get() or multiple values with getAll().*/
    this.route.paramMap.subscribe((params) => {
      this.formattedstartDate = params.get('startDate');
      this.formattedendDate = params.get('endDate');
      console.log('startDate', this.formattedstartDate);
      console.log('endDate ', this.formattedendDate);
    });
    this.storage
      .get('studentInfo')
      .then((info) => {
        //if the cart is emty, it has empty values
        this.studentInfo = info;
        console.log(this.studentInfo);
      })
      .then(() => {
        this.storage.get('cart').then((cart) => {
          //if the cart is emty, it has empty values
          if (cart == null) {
            this.cart = [];
          } else {
            // this.cart = cart;
            this.globalCart = cart;
            this.cart = cart[this.studentInfo.id].flat();
            console.log(this.cart);
          }
        });
      });

    this.shipping_formGroup = this.formBuilder.group({
      firstname: new FormControl(
        this.global.studentInfo.name,
        Validators.required
      ),
      lastname: new FormControl(
        this.global.studentInfo.surname,
        Validators.required
      ),
      startDate: new FormControl(this.formattedstartDate, Validators.required),
      endDate: new FormControl(this.formattedendDate),
    });
  }

  async onSubmit(values) {
    const submitData: any[] = [];

    if (!submitData) {
    } else {
      var studentInfo = this.global.studentInfo;
      console.log(studentInfo);

      /*    let order = new Order();
      order.name = values.firstname;
      order.surname = values.lastname;
      order.year = values.year;
      order.startDate = values.startDate;
      order.endDate = values.endDate; */

      // this.cart= order.cart.flat();

      this.cart.forEach((item) => {
        let order = new Order();
        order.studentID = studentInfo.id;
        order.name = values.firstname;
        order.surname = values.lastname;
        order.year = values.year;
        order.startDate = values.startDate;
        order.endDate = values.endDate;
        order.itemId = item.id;
        order.ItemName = item.name;
        order.year = item.photos;

        console.log(order);
        this.http
          .post(
            'https://starwarz-soleit.herokuapp.com/checkout.php',
            JSON.stringify(order),
            this.global.config
          )
          .subscribe((data) => {
            console.log(' order placed successfully');
            console.log(data);
          });
      });
    }
    //you added this
    await this.clearStudentCart();
  }

  async clearStudentCart() {
    this.cart = [];
    this.globalCart[this.studentInfo.id] = this.cart;
    await this.storage.set('cart', this.globalCart);
  }

  submission() {
    {
      this.router.navigate(['/submission', {}]);
    }
  }
}
