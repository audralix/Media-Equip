import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Router} from '@angular/router';
import { AlertController } from "@ionic/angular";
// import { Alert } from "selenium-webdriver";

@Injectable()

export class GlobalProvider {
    
    //created the parameter
    public loggedIn = false;
    public studentInfo: any = {};
    public adminInfo: any = {};
   
    
    //new parameter
    public config ={
        headers: new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
        },)
    };
 

    constructor(
        private router: Router, 
        private alertCtrl: AlertController) {

    }

    //creating error message
    async errorMessage(message) {
        //imported alertController
        const alert = await this.alertCtrl.create({
            header: 'Error',
            subHeader: '',
            message: '<div class="alert-mes">'+message+'</div>',
            buttons: [{text: 'Ok', cssClass: 'btn-deco'}]
        });
        await alert.present();
    }

    
}