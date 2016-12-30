import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppUser } from '../../models/app.user';
import { Page2 } from '../page2/page2';
import { QuestionServicev2 } from '../../shared/app.questionservicev2';
import { UserQuestionsPage } from '../user-questions/user-questions';
import { UserAnswersPage } from '../user-answers/user-answers';

@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoPage {

  myUser : AppUser;
  questionCount : any;
  answerCount : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _questionServicev2: QuestionServicev2) {
    this.myUser = this.navParams.get('myUser');   
    this.getQuestionsCount(this.myUser.id);    
    this.getAnswersCount(this.myUser.id);
  }

  getQuestionsCount(userId: string){
    this._questionServicev2.countQuestionsByUserId(userId)
      .subscribe((data:any) => this.questionCount = data, 
          error => console.log(error),
          () => console.log('Loaded question count')
        );
  }

  getAnswersCount(userId: string){
    this._questionServicev2.countAnswersByUserId(userId)
      .subscribe((data:any) => this.answerCount = data, 
          error => console.log(error),
          () => console.log('Loaded answer count')
        );
  }

  ionViewDidLoad() {
     
  }

  logout(): void{
    localStorage.removeItem("myUser");
    this.navCtrl.setRoot(Page2);
  }

  extractFirstLetter(userName: string){
    return userName.charAt(0);
  }

  showAskedQuestions(): void{
    console.log('invoked showAskedQuestions');

    this.navCtrl.push(UserQuestionsPage, {userId: this.myUser.id})

    //push to new page passing userId
    //call the server API that shows all questions for given user ID     
  }

  showRepliedAnswers(): void{
    console.log('invoke showRepliedAnswers');
  }

}
