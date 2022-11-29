import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from 'src/app/globalpro';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  constructor(private storage: Storage, private global: GlobalProvider) {}

  studentInfo: any;

  ngOnInit() {
    this.storage.get('studentInfo').then((info) => {
      this.studentInfo = info;
      console.log(this.global.studentInfo);
    });
  }
}
