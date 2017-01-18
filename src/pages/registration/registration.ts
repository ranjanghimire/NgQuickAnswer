import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppUser } from '../../models/app.user';
import { Page2 } from '../page2/page2';


@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage {

  private formUser : AppUser = new AppUser();

  constructor(public navCtrl: NavController) {}

  showSignIn(): void{
    this.navCtrl.push(Page2);
  }

  registerUser(): void{
    
  }

}
