import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { QuestionServicev2 } from '../../shared/app.questionservicev2';
import { Question } from '../../models/app.question';

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
          private toastCtrl: ToastController,
          public alertCtrl: AlertController
        ) 
        {
          this.questionId = this.navParams.get("qId");
        }

  close() {
    this.viewCtrl.dismiss();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Report this?',
      message: 'We will review this question and remove if found offensive.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
            this.viewCtrl.dismiss();
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.reportThis();
          }
        }
      ]
    });
    confirm.present();
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
