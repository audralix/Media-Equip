import { Component, OnInit } from '@angular/core';

import { GlobalProvider } from '../globalpro';

import { HttpClient, HttpClientModule } from '@angular/common/http';

//Import the studentdata service
import { Router } from '@angular/router';
// import { StudentDataService } from '../services/studentdata.service';

// Import the student class, import it from student.ts
import { Student } from './student';
import { ModalController, NavParams } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { AuthService } from '../service/auth.service';

import { Storage } from '@ionic/storage';

imports: [HttpClient, HttpClientModule, GlobalProvider];

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //collecting the information (constant objects)
  // loginData:Student = { 'email': '', 'password': '', 'id':0, 'name':'', 'surname':'', 'year':0, 'course':''};
  loginData = {
    email: '',
    password: '',
    id: 0,
    name: '',
    surname: '',
    year: 0,
    course: '',
  };

  //admin, ngmodel from html
  adminData = { email: '', password: '', name: '' };

  // we need use an intermdiate array to store the result
  // and then pass into newStudents?
  students: any;
  newStudents: any;
  newStudent = new Student();

  showMe: boolean = false;

  constructor(
    private global: GlobalProvider,
    private http: HttpClient,
    // private studentdataservice: StudentDataService,
    private router: Router,
    private modalCtrl: ModalController,
    private auth: AuthService,

    public storage: Storage
  ) {}

  ngOnInit() {}

  ShowMe() {
    this.showMe = !this.showMe;
  }

  //student
  doLogin() {
    console.log('logged in');
    this.global.loggedIn = true;
    console.log(this.global.loggedIn);
    //this.logindata coming from Html
    //student
    console.log('student log in', this.loginData);
    this.http
      .post(
        'https://starwarz-soleit.herokuapp.com/login.php',
        this.loginData,
        this.global.config
      )
      .subscribe(
        (data) => {
          console.log(data);
          // this.sessionToData(data);
          this.global.loggedIn = true;
          // studentInfo is from GlobalProvider.ts
          this.global.studentInfo = data;
          // this.storage.set(key:'string', value:any)---resource:https://ionicframework.com/docs/v3/storage/
          this.storage.set('studentInfo', data);
          console.log(this.global.studentInfo);
          this.IfLogin();

          //if data is 1
          /*      if(data[0]["status"]=="success"){
        console.log(data);
        this.sessionToData(data);
      }  */
        } /* , error => {
      this.global.errorMessage(JSON.stringify(error));
    } */
      );

    //Admin
    console.log(this.adminData);
    this.http
      .post(
        'https://starwarz-soleit.herokuapp.com/admin.php',
        this.adminData,
        this.global.config
      )
      .subscribe((data) => {
        console.log(data);
        // this.sessionToData(data);
        this.global.loggedIn = true;
        // studentInfo is from GlobalProvider.ts
        this.global.adminInfo = data;
        // this.storage.set(key:'string', value:any)---resource:https://ionicframework.com/docs/v3/storage/
        this.storage.set('adminInfo', data);
        console.log(this.global.adminInfo);
        this.IfLogin();
      });

    //loogedIn is from globalpro.ts
    this.global.loggedIn = true;
    console.log(this.global.loggedIn);
  }

  /* Login Funtion*/
  studentLogIn() {
    console.log('login pressed');
    if (this.loginData.email == '' && this.loginData.password == '') {
      console.log('nothing provided');
      // this.global.errorMessage('Please enter login credentials');
    } else if (
      this.loginData.email == undefined &&
      this.loginData.email == ''
    ) {
      this.global.errorMessage('Email required');
    } else if (
      this.loginData.password == '' &&
      this.loginData.password == undefined
    ) {
      this.global.errorMessage('Password required');
    } else {
      this.doLogin();
    }
  }
  login() {
    console.log('login pressed');
    if (this.loginData.email == '' && this.loginData.password == '') {
      console.log('nothing provided');
      // this.global.errorMessage('Please enter login credentials');
    } else if (
      this.loginData.email == undefined &&
      this.loginData.email == ''
    ) {
      this.global.errorMessage('Email required');
    } else if (
      this.loginData.password == '' &&
      this.loginData.password == undefined
    ) {
      this.global.errorMessage('Password required');
    } else {
      this.doLogin();
    }

    console.log('login pressed');
    if (this.adminData.email == '' && this.adminData.password == '') {
      console.log('nothing provided');
      // this.global.errorMessage('Please enter login credentials');
    } else if (
      this.adminData.email == undefined &&
      this.adminData.email == ''
    ) {
      this.global.errorMessage('Email required');
    } else if (
      this.adminData.password == '' &&
      this.adminData.password == undefined
    ) {
      this.global.errorMessage('Password required');
    } else {
      this.doLogin();
    }
  }

  // Create modal that will launch to add a new student to
  // the MySQL database using the AddStudentPage
  // The student object is then passed back from the modal
  // so that we can update the list view with the new item
  // Note: ensure to import the AddStudentPage module to app.module.ts and
  // add it to the imports array too
  async addStudent() {
    // create modal instance
    const modal = await this.modalCtrl.create({
      component: RegisterPage,
    });
    //Get the data returned from the Modal and add to global variable
    modal.onDidDismiss().then((data) => {
      // Check if data has been retured
      // if not, the modal was cancelled
      // using back button
      if (data['data']) {
        // this.newStudents.push(data['data']);
        console.log(data['data']);
      } else {
        console.log('Modal Cancelled');
      }
    });
    return await modal.present();
  }

  /* ngOnInit() {
    this.getStudentData();
  } */

  IfLogin() {
    //if this is true, router navigates
    //you should import the router function
    //if it is loggen in, contunie to check out
    //else we go to logIn
    if (this.global.loggedIn) {
      this.router.navigate(['/home']);
    } else {
      //if it is logged in, go to the checkout.
      this.router.navigate(['login', { next: '/checkout' }]);
    }
  }

  /*  signIn(admin) {
    this.auth.signIn(admin).subscribe((user) => {
      // You could now route to different pages
      // based on the user role
      // let role = user['role'];

      this.router.navigateByUrl('/home', { replaceUrl: true });
    });
  } */
}
