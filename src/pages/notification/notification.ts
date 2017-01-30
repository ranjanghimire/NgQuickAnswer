import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Configuration } from '../../app/app.constants';
import { DataService } from '../../shared/app.dataservice';
import { Notification } from '../../models/app.notification';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {

  myUserId: string;

  notifications: Notification[];

  constructor(private _dataService: DataService,
              public navCtrl: NavController, 
              private _conf : Configuration, 
              public navParams: NavParams) {
                this.myUserId = JSON.parse(localStorage.getItem("myUser")).id;
                this.getAllNotifications(this.myUserId);
              }

  getAllNotifications(userId: string){
    this._dataService.getNotifications(userId)
        .subscribe((data:Notification[]) => this.notifications = data, 
          error => console.log(error),
          () => console.log(this.notifications)
        );
  }

}
