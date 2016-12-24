import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Question } from '../../models/app.question';
import { Answer } from '../../models/app.answer';
import {Author} from '../../models/app.author';
import { AppUser } from '../../models/app.user';
import { Configuration } from '../../app/app.constants';
import { AnswerService } from '../../shared/app.answerservice';

/*
  Generated class for the NewAnswerPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new-answer',
  templateUrl: 'new-answer-page.html'
})

export class NewAnswerPage {

  private myQuestion: Question;  
  private newAuthor : Author;
  private newAnswer: Answer = new Answer();
  private retQuestion: Question;
  private myUserData : AppUser;


  constructor(private _answerService: AnswerService, public navCtrl: NavController, public navParams: NavParams,private _conf : Configuration) {
    this.myQuestion = this.navParams.get("question");
    this.myUserData = _conf.myUser;
  }

  ionViewDidLoad() {
    //console.log(this.myQuestion.mainQuestion);
  }

  logForm(): void{
    //console.log(this.newAnswer.mainAnswer);
    //TODO: Upon submit, append this answer to the question and save it.
    //TODO: Also, redirect the page to 'BACK'.
    //validate userInputs


    //Answer id should be populated in server
    this.newAuthor  = new Author();
    this.newAuthor.appUserId = this.myUserData.id;
    this.newAuthor.appUserName = this.myUserData.userName;
    //Author id should be populated in Server

    this.newAnswer.author = this.newAuthor;

    this.newAnswer.weight = 1;
    //console.log(this.myQuestion.id);
    //console.log(this.newAnswer);
    this.postAnswer(this.newAnswer, this.myQuestion.id);

  }

  private postAnswer(answer: Answer, id: string): void{
    this._answerService
            .postAnswer(id, answer)
            .subscribe((data:Question) => this.retQuestion = data,
                error => console.log(error),
                () => this.goBackToHome());
  }

  goBackToHome(): void{
      //go back and show toast 'Answer submitted'.
      //this.navCtrl.pop();
      console.log('Answer submitted');
  }

}
