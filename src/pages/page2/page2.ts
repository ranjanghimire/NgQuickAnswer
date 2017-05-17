import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { AppUser } from '../../models/app.user';
import { DataService } from '../../shared/app.dataservice';
import { Page1 } from '../page1/page1';
import { RegistrationPage } from '../registration/registration';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
 
  public formUser : AppUser = new AppUser();

  public retUser: AppUser;
  
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, 
              public viewCtrl: ViewController, public navParams: NavParams, public _service: DataService) {   
    if (localStorage.getItem("myUser") != null){
      this.navCtrl.setRoot(Page1);
    }
    else{
      localStorage.clear();
    }
    
  }

  goToRegistrationPage(){
    this.navCtrl.push(RegistrationPage);
  }

  gotToForgetPasswordPage(){
    this.navCtrl.push(ForgotPasswordPage);
  }

  loginUser() : void{

    let loadingPopup = this.loadingCtrl.create({
      content: 'Please wait ...'
    });

    loadingPopup.present();

    this._service.findByUserNameAndPassword(this.formUser.userName, this.formUser.password)
        .subscribe((data:AppUser) => this.retUser = data,
                error => {
                  loadingPopup.dismiss();
                  console.log(error);
                }, //TODO: Display a modal with error message
                () => {
                  
                    localStorage.clear();
                  
                    localStorage.setItem("myUser", JSON.stringify(this.retUser));
                  
                  loadingPopup.dismiss();
                 
                  this.navCtrl.setRoot(Page1);
                    
                });  
                

  }

}
