import { Component} from '@angular/core';

import { NavController } from 'ionic-angular';

import { QuestionService } from '../../shared/app.questionservice';
import { Question } from '../../models/app.question';
import { AppUser } from '../../models/app.user'
import { UserInfoPage } from '../user-info/user-info';
import { Configuration } from '../../app/app.constants'

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

public retQuestions : Question[];

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

  goToUserInfo() : void{
    this.navCtrl.push( UserInfoPage, { myUser : this.myUserData })
  }

}
