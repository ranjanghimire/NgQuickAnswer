import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AppUser } from '../../models/app.user';
import { Page2 } from '../page2/page2';
import { QuestionServicev2 } from '../../shared/app.questionservicev2';
import { DataService } from '../../shared/app.dataservice';
import { UserQuestionsPage } from '../user-questions/user-questions';
import { UserAnswersPage } from '../user-answers/user-answers';
import { MessagePage } from '../message/message'; 
import { UserLikesPage } from '../user-likes/user-likes';
import { ComposeMessagePage } from '../compose-message/compose-message';
import { BookmarkedQuestionsPage } from '../bookmarked-questions/bookmarked-questions';

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

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, 
              public _dataService: DataService, public _questionServicev2: QuestionServicev2, public toastCtrl: ToastController) {
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

  goToBookmarksPage(): void{
    this.navCtrl.push(BookmarkedQuestionsPage, {userId: this.retrievedUserId});
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

  goToLikedQuestionsPage(userId: string): void{
    this.navCtrl.push(UserLikesPage, {userId: userId});
  }

  goToComposeMessagePage(toUser: AppUser){
    //goto Compose Message page
    this.navCtrl.push(ComposeMessagePage, {toUser: toUser});
  }

  updateUserPassword(): void{

    let loadingPopup = this.loadingCtrl.create({
      content: 'Updating ...'
    });

    loadingPopup.present();

    this._dataService.updatePassword(this.retrievedUser.userName, this.retrievedUser.password)
        .subscribe((data:AppUser) => this.retrievedUser = data, 
          error => {
            loadingPopup.dismiss();
            this.presentToast('There was an ERROR updating your information..');
            console.log(error)
          }, 
          () => {
            loadingPopup.dismiss();
            this.presentToast('Your information has been updated!');
            console.log('Changed password')
          }
        );
  }

  presentToast(msg: string) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bottom',
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

}
