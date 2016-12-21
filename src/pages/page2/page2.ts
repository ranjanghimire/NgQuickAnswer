import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { AppUser } from '../../models/app.user';
import { DataService } from '../../shared/app.dataservice';
import { Page1 } from '../page1/page1'

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {

  private formUser : AppUser = new AppUser();

  private retUser: AppUser;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private _service: DataService) {   
    if (localStorage.getItem("myUser") != null){
      this.navCtrl.setRoot(Page1);
    }
  }

  loginUser() : void{
   
    this._service.findByUserNameAndPassword(this.formUser.userName, this.formUser.password)
        .subscribe((data:AppUser) => this.retUser = data,
                error => console.log(error), //TODO: Display a modal with error message
                () => {
                  localStorage.setItem("myUser", JSON.stringify(this.retUser))
                  this.navCtrl.setRoot(Page1);
                });  
                //TODO: Save retUser in localStorage and remove it on logout

  }

}
