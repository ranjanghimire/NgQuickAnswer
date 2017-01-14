import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppUser } from '../../models/app.user';
import { Page2 } from '../page2/page2';
import { QuestionServicev2 } from '../../shared/app.questionservicev2';
import { DataService } from '../../shared/app.dataservice';
import { UserQuestionsPage } from '../user-questions/user-questions';
import { UserAnswersPage } from '../user-answers/user-answers';
import { MessagePage } from '../message/message'; 
import { ComposeMessagePage } from '../compose-message/compose-message';

@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoPage {

  retrievedUser: AppUser; //call API with id to load this
  retrievedUserId : string;
  questionCount : any;
  answerCount : any;
  isLoggedInUser: boolean = false;
  loggedInUser: AppUser;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private _dataService: DataService, private _questionServicev2: QuestionServicev2) {
    this.retrievedUserId = this.navParams.get('myUserId');   
    
    this.loggedInUser = JSON.parse(localStorage.getItem("myUser"))

    if (this.retrievedUserId == this.loggedInUser.id){
      this.isLoggedInUser = true;
    }

    this.retrieveUser(this.retrievedUserId);

    this.getQuestionsCount(this.retrievedUserId);    
    this.getAnswersCount(this.retrievedUserId);
  }

  retrieveUser(userId: string){
    this._dataService.findUserById(userId)
        .subscribe((data:AppUser) => this.retrievedUser = data, 
          error => console.log(error), 
          () => console.log('Loaded user data')
        );
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

  showMessages(): void{
    this.navCtrl.push(MessagePage);
  }

  logout(): void{
    localStorage.removeItem("myUser");
    this.navCtrl.setRoot(Page2);
  }

  extractFirstLetter(userName: string){
    return userName.charAt(0);
  }

  showAskedQuestions(): void{
    this.navCtrl.push(UserQuestionsPage, {userId: this.retrievedUserId});
  }

  showRepliedAnswers(): void{
    this.navCtrl.push(UserAnswersPage, {userId: this.retrievedUserId});
  }

  goToComposeMessagePage(toUser: AppUser){
    //goto Compose Message page
    this.navCtrl.push(ComposeMessagePage, {toUser: toUser});
  }

}
