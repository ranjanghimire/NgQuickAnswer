import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Configuration } from '../../app/app.constants';
import { DataService } from '../../shared/app.dataservice';
import { MessagePage } from '../message/message'; 
import { AppUser } from '../../models/app.user';
import { Notification } from '../../models/app.notification';
import { Question } from '../../models/app.question';
import { AnswersToTheQuestionPage } from '../answers-to-the-question/answers-to-the-question';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {

  myUserId: string;

  showBadge: boolean = false;

  appUser: AppUser;

  notifications: Notification[];

  constructor(public _dataService: DataService,
              public navCtrl: NavController, 
              public _conf : Configuration, 
              public navParams: NavParams) {
                
              }

  ionViewWillEnter() {
    this.myUserId = JSON.parse(localStorage.getItem("myUser")).id;
                this.getAllNotifications(this.myUserId);

                this._dataService.findUserById(this.myUserId)
                .subscribe((data:AppUser) => this.appUser = data, 
                  error => console.log(error), 
                  () => {   
                    if (this.appUser.messages[0].read == false){
                      this.showBadge = true;
                    }                     
                  }
                );
  }

  getAllNotifications(userId: string){
    this._dataService.getNotifications(userId)
        .subscribe((data:Notification[]) => this.notifications = data, 
          error => console.log(error),
          () => console.log(this.notifications)
        );
  }

  goToAnswersPage(question : Question) : void{
    this.navCtrl.push( AnswersToTheQuestionPage, { question : question });
  }

  getTheTime(strDate: string){
    return this.convertUTCDateToLocalDate(new Date(strDate));
  }

  goToMessagesPage(): void{
    console.log('goToMessages() invoked!');
    this.showBadge = false;
    this.navCtrl.push(MessagePage);
  }

  convertUTCDateToLocalDate(date) {
      var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

      var offset = date.getTimezoneOffset() / 60;
      var hours = date.getHours();

      newDate.setHours(hours - offset);

      return newDate;   
  }

}
