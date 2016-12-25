import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppUser } from '../../models/app.user';
import { Page2 } from '../page2/page2';

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

  logout(): void{
    localStorage.removeItem("myUser");
    this.navCtrl.setRoot(Page2);
  }

  extractFirstLetter(userName: string){
    return userName.charAt(0);
  }

}
