import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppUser } from '../../models/app.user';

@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoPage {

  myUser : AppUser;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myUser = this.navParams.get('myUser');       
  }

  ionViewDidLoad() {
     
  }

}
