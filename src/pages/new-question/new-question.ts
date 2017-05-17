import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController } from 'ionic-angular';
import { Question } from '../../models/app.question';
import { AppUser } from '../../models/app.user';
import { Author } from '../../models/app.author';
import { QuestionServicev2 } from '../../shared/app.questionservicev2';
import { CategoryService } from '../../shared/app.categoryservice';
import { QuestionPublishedPage } from '../question-published/question-published'

@Component({
  selector: 'page-new-question',
  templateUrl: 'new-question.html'
})
export class NewQuestionPage {

  public myUserData : AppUser;

  public newAuthor : Author;

  public retPostQuestion : Question;

  public categories : string[];

  public selectedCategory : string;

  askedQuestion : Question = new Question();

  constructor(public _questionService : QuestionServicev2,public navCtrl: NavController,
       public loadingCtrl: LoadingController, 
       public viewCtrl: ViewController, public _catService: CategoryService) {
    this.myUserData = JSON.parse(localStorage.getItem("myUser"));
    this.selectedCategory = 'General';
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

    if (!this.selectedCategory){
      this.selectedCategory = 'General';
    }

    this.askedQuestion.category = this.selectedCategory;



    this.postQuestion(this.askedQuestion);
   
  }

  //TODO: create new page for error() and show nice message.
  //TODO: Once question is asked, its id should be saved in User table.
  public postQuestion(question : Question) : void{
    
    let loadingPopup = this.loadingCtrl.create({
      content: 'Please wait ...'
    });

    loadingPopup.present();

    this._questionService
            .postQuestion(question, this.myUserData.id)
            .subscribe((data:Question) => this.retPostQuestion = data,
                error => console.log(error),
                () => {
                  loadingPopup.dismiss();
                  this.goToAfterSubmitPage();
                });
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
