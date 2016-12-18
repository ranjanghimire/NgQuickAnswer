import { Component} from '@angular/core';

import { NavController } from 'ionic-angular';

import { QuestionService } from '../../shared/app.questionservice';
import { Question } from '../../models/app.question';
import { AppUser } from '../../models/app.user';
import { UserInfoPage } from '../user-info/user-info';
import { Configuration } from '../../app/app.constants'
import { NewQuestionPage } from '../new-question/new-question'

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

public retQuestions : Question[];

public retUpdateQuestion : Question;

private myUserData : AppUser;


  constructor(public navCtrl: NavController, private _questionService : QuestionService, private _conf : Configuration) {
    this.myUserData = _conf.myUser;
  }

  ionViewDidEnter() {
      this.getAllQuestions();
  }

  private getAllQuestions() : void{
    this._questionService
            .getAllQuestions()
            .subscribe((data:Question[]) => this.retQuestions = data,
                error => console.log(error),
                () => console.log('Loaded users to myUsers'));
  }

  private updateQuestionById(updateQuestion: Question): void{
    this._questionService.updateQuestionById(updateQuestion)
        .subscribe((data:Question) => this.retUpdateQuestion = data,
                error => console.log(error),
                () => console.log('Updated the question votes in server.'));
  }

  goToUserInfo() : void{
    this.navCtrl.push( UserInfoPage, { myUser : this.myUserData })
  }
  
  toggleAnswers(question : Question) : void{
    question.showAnswersinUI = !question.showAnswersinUI;
  }

  askNewQuestion() : void{
    this.navCtrl.push(NewQuestionPage);
  }

  incrementVotes(question) : void{
    console.log("This question has " + question.votes + " votes.");
    
    //TODO: Allow like only once. 
    //User shouldn't be able to like multiple times.
    //Also, server should know if a question has already been liked.

    ++question.votes;

    this.updateQuestionById(question);

  }

}
