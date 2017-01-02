import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, ToastController } from 'ionic-angular';
import { QuestionServicev2 } from '../../shared/app.questionservicev2';
import { Question } from '../../models/app.question';

/*
  Generated class for the Popover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {

  questionId: string;
  
  constructor(
          public navCtrl: NavController, 
          private navParams: NavParams,
          public viewCtrl: ViewController, 
          private _questionServicev2: QuestionServicev2,
          private toastCtrl: ToastController
        ) 
        {
          this.questionId = this.navParams.get("qId");
        }

  close() {
    this.viewCtrl.dismiss();
  }

  reportThis(): void{

    this._questionServicev2.reportQuestion(this.questionId)
        .subscribe((data:Question) => console.log(data), 
          error => console.log(error),
          () => console.log('Reported question')
        );

    this.viewCtrl.dismiss();
    this.presentToast();
  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Thanks! Our team will review the question and remove if necessary. ',
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

}
