import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the QuestionPublished page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-question-published',
  templateUrl: 'question-published.html'
})
export class QuestionPublishedPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello QuestionPublishedPage Page');
  }

}
