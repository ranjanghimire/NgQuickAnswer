import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Configuration } from '../../app/app.constants';
import { Question } from '../../models/app.question';
import { Answer } from '../../models/app.answer';
import { AppUser } from '../../models/app.user';
import {Author} from '../../models/app.author';
import { AnswerServicev2 } from '../../shared/app.answerservicev2';
import { CategoryQuestionsPage } from '../category-questions/category-questions';
import { UserInfoPage } from '../user-info/user-info';
import { PopoverPage } from '../popover/popover';
import { QuestionService } from '../../shared/app.questionservice';


@Component({
  selector: 'page-answers-to-the-question',
  templateUrl: 'answers-to-the-question.html'
})
export class AnswersToTheQuestionPage {

  @ViewChild('input') myInput ;

  private myQuestion : Question;
  private myUserData : AppUser;
  private myAnswer : Answer;
  private newAuthor : Author;
  private retQuestion: Question;
  private retIncAnsQuestion: Question;

  private retIncQuestion: Question;
  
  private _tmpAnswer: string;

  constructor(private _answerService: AnswerServicev2, 
        public popoverCtrl: PopoverController,public navCtrl: NavController,
        public navParams: NavParams, 
        private _questionService : QuestionService, 
        private _conf : Configuration) {
    
    this.myQuestion = this.navParams.get("question");
    this.myUserData = _conf.myUser;
  }
  
  logAnswer(): void{
    this.myAnswer = new Answer();
    this.newAuthor  = new Author();
    this.newAuthor.appUserId = this.myUserData.id;
    this.newAuthor.appUserName = this.myUserData.userName;

    this.myAnswer.author = this.newAuthor;

    this.myAnswer.weight = 1;

    this.myAnswer.mainAnswer = this._tmpAnswer;

    this._tmpAnswer = "";

    this.afterSubmit(this.myAnswer);

    this.postAnswer(this.myAnswer, this.myQuestion.id, this.myUserData.id);
  }

   private incrementLikesOfQuestion(question: Question, userId: string){
    this._questionService.incrementLikesOfQuestion(question, userId)
      .subscribe((data:Question) => this.retIncQuestion = data,
                error => console.log(error),
                () => console.log('Updated the question votes in server.'));
  }

    decrementVotes(question: Question): void{
    question.liked = false;
    --question.votes;
    //Name is increment but it works.
    this.incrementLikesOfQuestion(question, this.myUserData.id);
  }

  incrementVotes(question: Question) : void{

    if(question.liked){
      //TODO: invoke decrementVotes and toggle class.
      this.decrementVotes(question);
      return;
    }
    else{
      console.log("This question has " + question.votes + " votes.");

      question.liked = true;
      
      //TODO: Allow like only once. 
      //User shouldn't be able to like multiple times.
      //Also, server should know if a question has already been liked.

      ++question.votes;

      this.incrementLikesOfQuestion(question, this.myUserData.id);
    }
  }

  decrementAnswerVotes(answer: Answer): void{
    answer.liked = false;
    --answer.votes;
    //Name is increment but it works.

    this.incrementLikesOfAnswer(answer, this.myUserData.id);
  }

  incrementAnswerVotes(answer) : void{

    if(answer.liked){
      //TODO: invoke decrementVotes and toggle class.
      this.decrementAnswerVotes(answer);
      return;
    }
    else{
      console.log("This answer has " + answer.votes + " votes.");

      answer.liked = true;
   
      ++answer.votes;

      this.incrementLikesOfAnswer(answer, this.myUserData.id);
    }
  }

  private incrementLikesOfAnswer(answer: Answer, userId: string): void{
    this._answerService.incrementLikes(answer, userId)
          .subscribe((data:Question) => this.retIncAnsQuestion = data, 
          error=> console.log(error), 
          () => console.log('Increased/Decreased likes of answer'))
  }

  private postAnswer(answer: Answer, id: string, userId: string): void{
    this._answerService
            .postAnswer(id, answer, userId)
            .subscribe((data:Question) => this.retQuestion = data,
                error => console.log(error),
                () => console.log('PostAnswer invoked'));
  }

  afterSubmit(answer: Answer): void{
      //Add the answer to the current list
      //Show a toast
      if(this.myQuestion.answers){
        //TODO: split if starts with @. Add the first word to answer's toUser
        //Rest in answer's main answer

        if (answer.mainAnswer.charAt(0) == '@'){
          answer.toUser = answer.mainAnswer.substr(0,answer.mainAnswer.indexOf(' '));
          answer.mainAnswer = answer.mainAnswer.substr(answer.mainAnswer.indexOf(' ')+1);
        }

        this.myQuestion.answers.push(answer);
      }
      else{
        this.myQuestion.answers = [];
        this.myQuestion.answers.push(answer);
      }
      console.log('Answer submitted');
  }

  ionViewDidLoad() {
    console.log('Hello AnswersToTheQuestionPage Page');
  }

  extractFirstLetter(userName: string){
    return userName.charAt(0);
  }

  goToCategoryQuestions(category: string): void{
    this.navCtrl.push(CategoryQuestionsPage, {category: category});
  }

  goToUserInfo(theUserId: string) : void{
    this.navCtrl.push( UserInfoPage, { myUserId : theUserId })
  }

  presentPopover(myEvent, questionId: string) {
    let popover = this.popoverCtrl.create(PopoverPage, { qId: questionId });
    popover.present({
      ev: myEvent
    });
  }

  reply(toUser: string): void{
    console.log('reply(toUser) invoked!');
    this._tmpAnswer = '@' + toUser + ' ';
    setTimeout(() => {
      this.myInput.setFocus();
    },150);
  }

}
