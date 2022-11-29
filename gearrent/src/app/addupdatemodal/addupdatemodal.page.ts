import { Component,Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-addupdatemodal',
  templateUrl: './addupdatemodal.page.html',
  styleUrls: ['./addupdatemodal.page.scss'],
})
export class AddupdatemodalPage implements OnInit {


  @Input() mySubject: BehaviorSubject<string>;

  constructor(
    private modalCtrl: ModalController,
    private router: Router) { }

  // Set the initial choice based on the input
  ngOnInit() {
    const preselect = this.mySubject.value;    
  /*   this.choice = this.choices.indexOf(preselect); */
  }

  close() {
    this.modalCtrl.dismiss();
  }

  ItemForm(){
    let navigationExtras: NavigationExtras = {
      state: { }
    };
    this.router.navigate(['itemregister'], navigationExtras);
  }

}
