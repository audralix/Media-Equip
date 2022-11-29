import { Component, OnInit } from '@angular/core';

import { Student } from '../login/student';
import { StudentCreateService } from '../service/studentcreate.service';
// Used to manage the Modal with dosmiss()
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  newStudent = new Student();

  constructor(
    private studentcreateservice: StudentCreateService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  /*  signIn() {
    this.router.navigateByUrl('/login');
  } */

  // Method that uses the student create service to post data to the database via php
  addStudent() {
    console.log(this.newStudent);
    // Make a post request using the studentcreate service and subscribe to the
    // response in order to inform the user of the outcome. In this case, we just
    // go back to the previous page
    this.studentcreateservice.postData(this.newStudent).subscribe(
      (res) => {
        console.log('Success: Record has been added' + res);
        this.dismiss(true);
        console.log(res);
      },
      async (err) => {
        console.log(err.message);
      }
    );

    this.router.navigateByUrl('/login');
  }

  // Now dismiss the modal and pass the created student back to
  // the tab1 page so that we can add the student to the list
  dismiss(returnStudent: boolean) {
    if (returnStudent) {
      this.modalCtrl.dismiss(this.newStudent);
    } else {
      this.modalCtrl.dismiss();
    }
  }
}
