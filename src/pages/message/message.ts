import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppUser } from '../../models/app.user';
import { UserInfoPage } from '../user-info/user-info';
import { ComposeMessagePage } from '../compose-message/compose-message';
import { MomentModule  } from 'angular2-moment/module';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {

  appUser: AppUser;

  inboxFlag: boolean = true;

  selectedText: string = 'Inbox';

  constructor(public navCtrl: NavController) {

    this.appUser = JSON.parse(localStorage.getItem("myUser"));

  }

  onChange(): void{
    if (this.selectedText == 'Inbox'){
      this.inboxFlag = true;
    }
    else{
      this.inboxFlag = false;
    }
  }

  extractFirstLetter(userName: string){
    return userName.charAt(0);
  }

  goToUserInfo(theUserId: string) : void{
    this.navCtrl.push( UserInfoPage, { myUserId : theUserId })
  }

  goToComposeMessage(toUserId: string, subject: string){
    this.navCtrl.push(ComposeMessagePage, {toUserId: toUserId, subject: subject});
  }
  

}
