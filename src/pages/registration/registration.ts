import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DataService } from '../../shared/app.dataservice';
import { AppUser } from '../../models/app.user';
import { Address } from '../../models/app.address';
import { Page2 } from '../page2/page2';
import { Page1 } from '../page1/page1';


@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage {

  private formUser : AppUser = new AppUser();
  private addr: Address;
  private retUser: AppUser;

  constructor(private loadingCtrl: LoadingController, public navCtrl: NavController, private _dataService: DataService) {
    this.addr = new Address();
    this.addr.city = '';
    this.formUser.address = this.addr;

  }

  showSignIn(): void{
    this.navCtrl.push(Page2);
  }

  registerUser(): void{

    let loadingPopup = this.loadingCtrl.create({
      content: 'Please wait ...'
    });

    loadingPopup.present();

    this._dataService.registerUser(this.formUser)
        .subscribe((data: AppUser) => this.retUser = data, 
        error => {
          console.log(error);
          loadingPopup.dismiss();
        }, 
        () => {
          console.log('User successfully registered');
          localStorage.clear();
                  
          localStorage.setItem("myUser", JSON.stringify(this.retUser));
          loadingPopup.dismiss();

          this.navCtrl.push(Page1);
        });    
  }

}

