import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { AppUser } from '../../models/app.user';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {

  private formUser : AppUser = new AppUser();
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {   

  }

  loginUser() : void{
    console.log("loginUser method invoked!");
    console.log(this.formUser.userName);
    console.log(this.formUser.password);


  }

}
