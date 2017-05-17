import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppUser } from '../../models/app.user';
import { Page2 } from '../page2/page2';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {

  public formUser : AppUser = new AppUser();

  constructor(public navCtrl: NavController) {}

  showSignIn(): void{
    this.navCtrl.push(Page2);
  }

  forgotPassword(): void{
    
  }

}
