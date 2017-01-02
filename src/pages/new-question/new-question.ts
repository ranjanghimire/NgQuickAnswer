import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Question } from '../../models/app.question';
import { Configuration } from '../../app/app.constants';
import { AppUser } from '../../models/app.user';
import { Author } from '../../models/app.author';
import { QuestionServicev2 } from '../../shared/app.questionservicev2';
import { CategoryService } from '../../shared/app.categoryservice';
import { QuestionPublishedPage } from '../question-published/question-published'

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

  private categories : string[];

  private selectedCategory : string;

  askedQuestion : Question = new Question();

  constructor(private _questionService : QuestionServicev2,public navCtrl: NavController,
       private _conf : Configuration, private viewCtrl: ViewController, private _catService: CategoryService) {
    this.myUserData = _conf.myUser;
    this.getAllCategories();
  }

   getAllCategories(): void{
         this._catService.getAllCategories()
            .subscribe((data:string[]) => this.categories= data,
            error => console.log(error),
            () => console.log('Loaded categories')
        );
     }

  ionViewDidLoad() {
    console.log('Hello NewQuestionPage Page');
  }

  logForm() : void{
    
    //TODO: Validate userInputs. 
   
    this.newAuthor  = new Author();
    this.newAuthor.appUserId = this.myUserData.id;
    this.newAuthor.appUserName = this.myUserData.userName;

    this.askedQuestion.author = this.newAuthor;

    this.askedQuestion.weight = 1;

    this.askedQuestion.category = this.selectedCategory;

    this.postQuestion(this.askedQuestion);
   
  }

  //TODO: create new page for error() and show nice message.
  //TODO: Once question is asked, its id should be saved in User table.
  private postQuestion(question : Question) : void{
    this._questionService
            .postQuestion(question, this.myUserData.id)
            .subscribe((data:Question) => this.retPostQuestion = data,
                error => console.log(error),
                () => this.goToAfterSubmitPage());
  }

  goToAfterSubmitPage() : void{
    console.log("Question posted");

    this.navCtrl
    .push(QuestionPublishedPage)
    .then(() => {
      const index = this.viewCtrl.index;
      this.navCtrl.remove(index);
    });

  }

}
