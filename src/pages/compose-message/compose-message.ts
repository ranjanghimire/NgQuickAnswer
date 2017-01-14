import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AppUser } from '../../models/app.user';
import { Message } from '../../models/app.message';
import { DataService } from '../../shared/app.dataservice';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-compose-message',
  templateUrl: 'compose-message.html'
})
export class ComposeMessagePage {

  private toUser: AppUser;
  private saveMessage: string;
  private subject: string;

  private msg: Message;
  private retUser: AppUser;

  constructor(public navCtrl: NavController, public navParams: NavParams, private datePipe: DatePipe,
              private loadingCtrl: LoadingController, private _dataService: DataService,
              private toastCtrl: ToastController) {
    this.toUser = this.navParams.get('toUser');  

  }

submitForm(): void{

  let loadingPopup = this.loadingCtrl.create({
      content: 'Sending ...'
    });

  loadingPopup.present();

  this.msg = new Message();
  this.msg.mainMessage = this.saveMessage;
  this.msg.fromUserId = JSON.parse(localStorage.getItem("myUser")).id;
  this.msg.fromUserName = JSON.parse(localStorage.getItem("myUser")).userName;
  this.msg.subject = this.subject;

   var formattedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm');

  this.msg.messageTime = formattedDate;
    
  if(this.toUser.messages){
    this.toUser.messages.push(this.msg);
  }
  else{
    this.toUser.messages = new Array<Message>();
    this.toUser.messages.push(this.msg);
    
  }

  this._dataService.updateUserById(this.toUser.id, this.toUser)
        .subscribe((data:AppUser) => this.retUser = data, 
          error => console.log(error), 
          () => {   
            this.saveMessage = '';
            this.subject = '';              
            loadingPopup.dismiss();
            this.presentToast();
            this.navCtrl.pop();
          }
        );

}

 presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Message sent! ',
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

}
