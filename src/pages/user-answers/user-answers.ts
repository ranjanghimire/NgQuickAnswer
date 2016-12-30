import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the UserAnswers page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-answers',
  templateUrl: 'user-answers.html'
})
export class UserAnswersPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello UserAnswersPage Page');
  }

}
