import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Question } from '../../models/app.question'

@Component({
  selector: 'page-answers-to-the-question',
  templateUrl: 'answers-to-the-question.html'
})
export class AnswersToTheQuestionPage {

  private myQuestion : Question;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.myQuestion = this.navParams.get("question");
    
  }

  ionViewDidLoad() {
    console.log('Hello AnswersToTheQuestionPage Page');
  }

}
