import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AppUser } from '../../models/app.user';
import { DataService } from '../../shared/app.dataservice';
import { Page1 } from '../page1/page1'

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {

  logoFlag: boolean = false;

  signInFlag: boolean = false;

  regFlag: boolean = false;

  forgetFlag: boolean = false;

  private formUser : AppUser = new AppUser();

  private retUser: AppUser;
  
  constructor(private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private _service: DataService) {   
    if (localStorage.getItem("myUser") != null){
      this.navCtrl.setRoot(Page1);
    }
    else{
      this.signInFlag = true;
      this.logoFlag = true;
      localStorage.clear();
    }
    
  }

  showForget(): void{
    this.signInFlag = false;
    this.logoFlag = true;
    this.regFlag = false;
    this.forgetFlag = true;

    this.formUser.userName = '';
    this.formUser.fullName = '';
    this.formUser.password = '';
    this.formUser.email = '';
  }

  showRegister(): void{
    this.signInFlag = false;
    this.forgetFlag = false;
    this.logoFlag = true;
    this.regFlag = true;

    this.formUser.userName = '';
    this.formUser.fullName = '';
    this.formUser.password = '';
    this.formUser.email = '';
  }

  showSignIn(): void{
    this.regFlag = false;
    this.forgetFlag = false;
    this.signInFlag = true;
    this.logoFlag = true;

    this.formUser.userName = '';
    this.formUser.fullName = '';
    this.formUser.password = '';
    this.formUser.email = '';
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
                 
                  setTimeout(() => {
                    this.navCtrl.setRoot(Page1);
                  }, 300);  
                });  
                

  }

}
