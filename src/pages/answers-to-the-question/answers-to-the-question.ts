import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Configuration } from '../../app/app.constants';
import { Question } from '../../models/app.question';
import { Answer } from '../../models/app.answer';
import { AppUser } from '../../models/app.user';
import {Author} from '../../models/app.author';
import { AnswerService } from '../../shared/app.answerservice';

@Component({
  selector: 'page-answers-to-the-question',
  templateUrl: 'answers-to-the-question.html'
})
export class AnswersToTheQuestionPage {

  private myQuestion : Question;
  private myUserData : AppUser;
  private myAnswer : Answer = new Answer();
  private newAuthor : Author;
  private retQuestion: Question;

  constructor(private _answerService: AnswerService, public navCtrl: NavController, public navParams: NavParams, private _conf : Configuration) {
    
    this.myQuestion = this.navParams.get("question");
    this.myUserData = _conf.myUser;
  }

  logAnswer(): void{
    this.newAuthor  = new Author();
    this.newAuthor.appUserId = this.myUserData.id;
    this.newAuthor.appUserName = this.myUserData.userName;

    this.myAnswer.author = this.newAuthor;

    this.myAnswer.weight = 1;

    this.postAnswer(this.myAnswer, this.myQuestion.id);
  }

  private postAnswer(answer: Answer, id: string): void{
    this._answerService
            .postAnswer(id, answer)
            .subscribe((data:Question) => this.retQuestion = data,
                error => console.log(error),
                () => this.afterSubmit(answer));
  }

  afterSubmit(answer: Answer): void{
      //Add the answer to the current list
      //Show a toast
      this.myQuestion.answers.push(answer);
      console.log('Answer submitted');
  }

  ionViewDidLoad() {
    console.log('Hello AnswersToTheQuestionPage Page');
  }

}
