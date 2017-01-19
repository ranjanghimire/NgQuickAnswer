import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppUser } from '../../models/app.user';
import { Address } from '../../models/app.address';
import { Page2 } from '../page2/page2';


@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage {

  private formUser : AppUser = new AppUser();
  private addr: Address;

  constructor(public navCtrl: NavController) {
    this.addr = new Address();
    this.addr.city = '';
    this.formUser.address = this.addr;

  }

  showSignIn(): void{
    this.navCtrl.push(Page2);
  }

  registerUser(): void{

    
  }

}
