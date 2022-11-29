import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { GlobalProvider } from '../globalpro';

import { format, parseISO } from 'date-fns';
import { BorroweditemsService } from '../service/borroweditems.service';

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
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  studentId: any;
  globalCart: any;
  isLoading: boolean;
  cart = [];
  groupsArray: any;
  items: any;
  item: items = {
    id: 0,
    name: '',
    description: '',
    photos: '',
    categoryid: 0,
    subcategory_id: 0,
    kitid: 0,
  };

  openCalendar: boolean = false;

  showMe: boolean = false;

  closeCalendar: boolean = true;

  dateStrings: string[];
  // Cached values (used to prevent infinite date change events).
  private currentDateStrings: string[];
  private borrowedItems: any[];
  private disabledDates: Set<string>;

  startDate = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
  endDate = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';

  formattedstartDate = '';
  formattedendDate = '';

  constructor(
    private storage: Storage,
    private router: Router,
    //created public, it can be changed
    public global: GlobalProvider,
    private borrowedItemsService: BorroweditemsService
  ) {}

  async ngOnInit() {
    //before opening, the cart info shoul be loaded
    this.isLoading = true;
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
            //if the cart is emty, it has empty values
            if (cart == null) {
              this.globalCart = {};
              this.cart = [];
            } else {
              this.globalCart = cart;
              this.cart = cart[this.studentId].flat();
              console.log(this.cart);
            }
          })
          .then((_) => {
            this.borrowedItemsService
              .getData()
              .subscribe((data) => {
                let cartItemsIds = new Set(this.cart.map((item) => item.id));
                this.borrowedItems = data['items'];
                this.borrowedItems = this.borrowedItems.filter((item) =>
                  cartItemsIds.has(item['itemId'])
                );
                this.disabledDates = new Set();
                this.borrowedItems.forEach((item) =>
                  this.disableDatesInRange(item['startDate'], item['endDate'])
                );
                console.log(this.borrowedItems);
                console.log(this.disabledDates);
              })
              .add(() => (this.isLoading = false));
          });
      });
  }

  clearCart() {
    // this.storage.clear();
    this.globalCart[this.studentId] = [];
    this.storage.set('cart', this.globalCart);
    console.log('cart was cleared');

    this.ngOnInit();
  }

  async removeCartItem(index) {
    // resource code: https://forum.ionicframework.com/t/after-storing-item-in-storage-it-is-not-removing-when-pressed-delete-item-button/160215
    if (index > -1) {
      await this.cart.splice(index, 1);
      console.log(this.cart);
      this.globalCart[this.studentId] = this.cart;
      // the page stayed same, if the page relooads and is refreshed.
      this.storage.set('cart', this.globalCart);
      console.log(this.cart);
      this.ngOnInit();
    }
  }

  checkIfLogin() {
    if (this.global.loggedIn) {
      this.router.navigate([
        '/checkout',
        { startDate: this.startDate, endDate: this.endDate },
      ]);
    } else {
      this.router.navigate(['/login', { next: '/checkout' }]);
    }
  }

  // CALENDAR
  dateChange(value) {
    // Detect changes (prevents an infinite loop).
    if (typeof this.dateStrings == 'string') {
      this.dateStrings = [this.dateStrings];
    }
    if (this.currentDateStrings === this.dateStrings) {
      return;
    }

    // Make sure we have at least two dates (otherwise nothing to do).
    if (!(this.dateStrings?.length > 1)) {
      return;
    }

    // Sort the dates so the earliest one is first.
    this.dateStrings.sort((a, b) => {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    });

    this.startDate = this.dateStrings[0];
    this.formattedstartDate = format(parseISO(this.startDate), ' MMM d, yyyy');
    console.log(this.formattedstartDate);
    this.endDate = this.dateStrings[this.dateStrings.length - 1];
    this.formattedendDate = format(parseISO(this.endDate), ' MMM d, yyyy');
    console.log(this.formattedendDate);

    console.log(this.dateStrings);
    console.log('startdate', this.startDate);
    console.log('enddate', this.endDate);

    // Revert to single selection (if required).
    if (this.currentDateStrings?.length > 2) {
      for (const d of this.currentDateStrings) {
        if (this.dateStrings.indexOf(d) === -1) {
          // Make sure this is not the first or last date (those are handled natively).
          if (d === this.currentDateStrings[0]) {
            break;
          }
          if (
            d === this.currentDateStrings[this.currentDateStrings.length - 1]
          ) {
            break;
          }

          this.dateStrings = [d];

          // No need to continue.
          break;
        }
      }
    }

    // Store the new value.
    const newValue = [];

    // Add all dates between the first and second dates.
    for (
      let d = new Date(this.dateStrings[0]);
      d <= new Date(this.dateStrings[this.dateStrings.length - 1]);
      d.setDate(d.getDate() + 1)
    ) {
      newValue.push(this.getDateString(d));
      console.log(d);
    }

    // Update the values at the end so the UI gets updated only once.
    this.dateStrings = newValue;
    this.currentDateStrings = newValue;
  }

  getDateString(d: Date) {
    return d.toISOString();
  }

  //  how to disable all weekend dates
  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    // Date will be enabled if it is not Sunday or Saturday
    return utcDay !== 0 && utcDay !== 6;
  };

  isDateEnabled = (dateString: string) => {
    return (
      !this.isLoading &&
      !this.disabledDates.has(dateString) &&
      this.isWeekday(dateString)
    );
  };

  disableDatesInRange(startDate: string, endDate: string) {
    const date = new Date(startDate);
    const end = new Date(endDate);

    while (date <= end) {
      this.disabledDates.add(date.toISOString().replace('T00:00:00.000Z', ''));
      date.setDate(date.getDate() + 1);
    }
  }

  OpenCalendar() {
    this.openCalendar = !this.openCalendar;
  }

  ShowMe() {
    this.showMe = !this.showMe;
  }

  CloseCalendar() {
    this.closeCalendar = !this.closeCalendar;
  }
}
