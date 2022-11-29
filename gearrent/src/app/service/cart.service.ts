import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface items {
  id: number;
  name: string;
  description: string;
  photos: string;
  categoryid: number;
  subcategory_id: number;
}

const ITEMS_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private storage: Storage) {
    this.init();
  }
  /*  init(){
      this.storage.clear()
    } */
  async init() {
    await this.storage.create();
  }
}
