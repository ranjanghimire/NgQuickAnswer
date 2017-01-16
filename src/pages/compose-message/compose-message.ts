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
  private fromUser; AppUser;
  private toUserId: string;

  private saveMessage: string;
  private subject: string;
  private tmpSubject: string;

  private msg: Message;

  private sentMsg: Message;

  private retUser: AppUser;
  private retFromUser: AppUser;

  constructor(public navCtrl: NavController, public navParams: NavParams, private datePipe: DatePipe,
              private loadingCtrl: LoadingController, private _dataService: DataService,
              private toastCtrl: ToastController) {
    this.toUser = this.navParams.get('toUser');  
    
    this._dataService.findUserById(JSON.parse(localStorage.getItem("myUser")).id)
        .subscribe((data:AppUser) => this.fromUser = data, 
          error => console.log(error), 
          () => {   
            console.log('Loaded this user');  
                                  
          }
        );

    if (!this.toUser){
      this.toUserId = this.navParams.get('toUserId');
      this._dataService.findUserById(this.toUserId)
          .subscribe((data:AppUser) => this.toUser = data, 
          error => console.log(error),
          () => {
            console.log('Loaded user data');
            //console.log(this.toUser);
          });
        this.tmpSubject = this.navParams.get('subject');

        if (this.tmpSubject){
          if(!this.tmpSubject.startsWith('RE: ')){
            this.subject = 'RE: ' + this.tmpSubject;
          }
          else{
            this.subject = this.tmpSubject;
          }
        }
      
    }

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

  this.sentMsg = new Message();
  this.sentMsg.mainMessage = this.saveMessage;
  this.sentMsg.subject = this.subject;
  this.sentMsg.toUserId = this.toUser.id;
  this.sentMsg.toUserName = this.toUser.userName;
  this.sentMsg.messageTime = formattedDate;

  if (this.fromUser.sentMessages && this.fromUser.sentMessages.length > 0){
    this.fromUser.sentMessages.push(this.sentMsg);
  }
  else{
    this.fromUser.sentMessages = new Array<Message>(); 
    this.fromUser.sentMessages.push(this.sentMsg);
  }

  this._dataService.updateUserById(this.toUser.id, this.toUser)
        .subscribe((data:AppUser) => this.retUser = data, 
          error => console.log(error), 
          () => {   
            this.saveMessage = '';
            this.subject = '';                          
          }
        );

    this._dataService.updateUserById(this.fromUser.id, this.fromUser)
        .subscribe((data:AppUser) => this.retFromUser = data, 
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
