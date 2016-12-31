import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuestionServicev2 } from '../../shared/app.questionservicev2';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  constructor(public navCtrl: NavController, private _questionServicev2: QuestionServicev2) {}

  ionViewDidLoad() {
    console.log('Hello SearchPage Page');
  }

}
