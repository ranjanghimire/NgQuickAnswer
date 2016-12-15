import { Component} from '@angular/core';

import { NavController } from 'ionic-angular';

import { DataService } from '../../shared/app.dataservice';
import { AppUser } from '../../models/app.user';
import { Configuration } from '../../app/app.constants'
import { UserInfoPage } from '../user-info/user-info'

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

public retUsers : AppUser[];

//loading static user data from Configuration class
private myUserData : AppUser;

  constructor(public navCtrl: NavController, private _dataService : DataService, private _conf : Configuration) {
    this.myUserData = _conf.myUser;
  }

  ionViewDidEnter() {
      //this.getAllUsers();
  }

  private getAllUsers() : void{
    this._dataService
            .getAllUsers()
            .subscribe((data:AppUser[]) => this.retUsers = data,
                error => console.log(error),
                () => console.log('Loaded users to myUsers'));
  }

  private goToUserInfo() : void{
    this.navCtrl.push(UserInfoPage, {myUser: this.myUserData});
  }

}
