import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppUser } from '../../models/app.user';
import { UserInfoPage } from '../user-info/user-info';
import { ComposeMessagePage } from '../compose-message/compose-message';
import { DataService } from '../../shared/app.dataservice';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {

  appUser: AppUser;

  retUser: AppUser;

  inboxFlag: boolean = true;

  selectedText: string = 'Inbox';

  constructor(public navCtrl: NavController, 
          private _dataService: DataService) {

    this._dataService.findUserById(JSON.parse(localStorage.getItem("myUser")).id)
        .subscribe((data:AppUser) => this.appUser = data, 
          error => console.log(error), 
          () => {   
            console.log('Loaded this user');  
            //console.log(this.appUser);                       
          }
        );

    //this.appUser = JSON.parse(localStorage.getItem("myUser"));
    //console.log(this.appUser);

  }

  ionViewDidLoad() {

    //Mark the read flag to true for all messages
    this._dataService.updateReadFlagInMessages(JSON.parse(localStorage.getItem("myUser")).id)
        .subscribe((data:AppUser) => this.retUser = data, 
          error => console.log(error), 
          () => {   
            console.log('Loaded this user');  
            //console.log(this.appUser);                       
          }
        );

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
