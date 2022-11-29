import { Component, OnInit } from '@angular/core';
import { BorroweditemsService } from 'src/app/service/borroweditems.service';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from 'src/app/globalpro';
import { ItemsService } from 'src/app/service/items.service';
@Component({
  selector: 'app-achieve',
  templateUrl: './achieve.page.html',
  styleUrls: ['./achieve.page.scss'],
})
export class AchievePage implements OnInit {
  studentId: any;
  orders: any;
  constructor(
    private borrowedItems: BorroweditemsService,
    private itemsService: ItemsService,
    private storage: Storage,
    private global: GlobalProvider
  ) {}

  ngOnInit() {
    this.storage.get('studentInfo').then((info) => {
      console.log(info);
      this.studentId = info.id;
      this.borrowedItems.getUserHistory(this.studentId).subscribe((result) => {
        this.orders = result['items'];
        /* const itemIds = new Set(result['items'].map((item) => item.itemId));
        this.itemsService.getData().subscribe((result) => {
          this.items = result['items'].filter((item) => itemIds.has(item.id));
          console.log(this.items);
          console.log(this.orders.items);
          this.orderedItems = this.orders.items;
          console.log(this.orderedItems);
        }); */
        console.log(result);
        console.log(result);
      });
    });
  }
}
