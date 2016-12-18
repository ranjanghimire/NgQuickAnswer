import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Question } from '../../models/app.question';
import { Configuration } from '../../app/app.constants';
import { AppUser } from '../../models/app.user';
import { Author } from '../../models/app.author';
import { QuestionService } from '../../shared/app.questionservice';;

/*
  Generated class for the NewQuestion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new-question',
  templateUrl: 'new-question.html'
})
export class NewQuestionPage {

  private myUserData : AppUser;

  private newAuthor : Author;

  private retPostQuestion : Question;

  askedQuestion : Question = new Question();

  constructor(private _questionService : QuestionService,public navCtrl: NavController, private _conf : Configuration) {
    this.myUserData = _conf.myUser;
  }

  ionViewDidLoad() {
    console.log('Hello NewQuestionPage Page');
  }

  logForm() : void{
    //console.log("logForm() invoked");
    //console.log(this.guid());

    //console.log(this.askedQuestion.topic);
    //console.log(this.askedQuestion.mainQuestion);

    //TODO: Validate userInputs. 

   
    this.newAuthor  = new Author();
    this.newAuthor.appUserId = this.myUserData.id;

    this.askedQuestion.author = this.newAuthor;

    this.askedQuestion.weight = 1;

    this.postQuestion(this.askedQuestion);
   
  }

  private postQuestion(question : Question) : void{
    this._questionService
            .postQuestion(question)
            .subscribe((data:Question) => this.retPostQuestion = data,
                error => console.log(error),
                () => this.goToAfterSubmitPage());
  }

  goToAfterSubmitPage() : void{
    console.log("Question posted");

    //this.nav
     // .push(DetailsPage)
     // .then(() => {
        // first we find the index of the current view controller:
      //  const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
       // this.nav.remove(index);
      //});
  }

}
