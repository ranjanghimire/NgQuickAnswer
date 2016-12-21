import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Question } from '../../models/app.question'; 
import { QuestionService } from '../../shared/app.questionservice';
import { AnswersToTheQuestionPage } from '../answers-to-the-question/answers-to-the-question';

/*
  Generated class for the TopicQuestions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-topic-questions',
  templateUrl: 'topic-questions.html'
})
export class TopicQuestionsPage {

  myTopic: string;

  public retQuestions : Question[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _questionService: QuestionService) {
    this.myTopic = this.navParams.get("topic");
    this.getAllQuestionsByTopic(this.myTopic);
  }

  getAllQuestionsByTopic(topic: string): void{
    this._questionService
            .getAllQuestionsByTopic(topic)
            .subscribe((data:Question[]) => this.retQuestions = data,
                error => console.log(error),
                () => console.log('Loaded questions'));
  }

  ionViewDidLoad() {
    console.log('Hello TopicQuestionsPage Page');
  }

  toggleAnswers(question : Question) : void{
    question.showAnswersinUI = !question.showAnswersinUI;
  }

  goToAnswersPage(question : Question) : void{
    this.navCtrl.push( AnswersToTheQuestionPage, { question : question });
  }

}
