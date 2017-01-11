import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppUser } from '../../models/app.user';

@Component({
  selector: 'page-compose-message',
  templateUrl: 'compose-message.html'
})
export class ComposeMessagePage {

  private toUser: AppUser;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.toUser = this.navParams.get('toUser');  

  }



}
