import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/*
  Generated class for the Popover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('Hello PopoverPage Page');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
