import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { QuestionServicev2 } from '../../shared/app.questionservicev2';
import { QuestionService } from '../../shared/app.questionservice';
import { DataService } from '../../shared/app.dataservice';
import { Question } from '../../models/app.question';
import { AppUser } from '../../models/app.user';
import { AnswersToTheQuestionPage } from '../answers-to-the-question/answers-to-the-question';
import { TopicQuestionsPage } from '../topic-questions/topic-questions';
import { PopoverPage } from '../popover/popover';

/*
  Generated class for the UnansweredQuestions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-unanswered-questions',
  templateUrl: 'unanswered-questions.html'
})
export class UnansweredQuestionsPage {
  
  private retQuestions : Question[];
  private retIncQuestion: Question;
  private myUser: AppUser;

  private retBookmarkUser: AppUser;

  constructor(public navCtrl: NavController, private _questionSeervicev2 : QuestionServicev2, 
                private navParams: NavParams, private _questionService: QuestionService, private popoverCtrl: PopoverController, 
                private _dataService: DataService) {
                    this.myUser = JSON.parse(localStorage.getItem("myUser"));
                    this.getUnansweredQuestions();
                }

  getUnansweredQuestions(): void{
    this._questionSeervicev2
            .getUnansweredQuestions(this.myUser.id)
            .subscribe((data:Question[]) => this.retQuestions = data,
                error => console.log(error),
                () => console.log('loaded questions'));
  }

  goToAnswersPage(question : Question) : void{
    this.navCtrl.push( AnswersToTheQuestionPage, { question : question });
  }

  decrementVotes(question: Question): void{
    question.liked = false;
    --question.votes;
    //Name is increment but it works.
    this.incrementLikesOfQuestion(question, this.myUser.id);
  }

  incrementVotes(question: Question) : void{

    if(question.liked){
      //TODO: invoke decrementVotes and toggle class.
      this.decrementVotes(question);
      return;
    }

    console.log("This question has " + question.votes + " votes.");

    question.liked = true;
    
    //TODO: Allow like only once. 
    //User shouldn't be able to like multiple times.
    //Also, server should know if a question has already been liked.

    ++question.votes;

    this.incrementLikesOfQuestion(question, this.myUser.id);

  }
    private incrementLikesOfQuestion(question: Question, userId: string){
    this._questionService.incrementLikesOfQuestion(question, userId)
      .subscribe((data:Question) => this.retIncQuestion = data,
                error => console.log(error),
                () => console.log('Updated the question votes in server.'));
  }

  extractFirstLetter(userName: string){
    return userName.charAt(0);
  }

  goToTopicQuestions(topic: string) : void{
    this.navCtrl.push(TopicQuestionsPage, { topic: topic} );
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  bookmarkQuestion(question: Question){
    if (question.bookmarked){
      this.unBookmarkQuestion(question);
      return;
    }

    question.bookmarked = true;

    this.bookmarkQuestionService(question.id, true);
  }

  unBookmarkQuestion(question: Question){
    question.bookmarked = false;

    this.bookmarkQuestionService(question.id, false);
  }

  private bookmarkQuestionService(questionId: string, flag: boolean){
    this._dataService.updateBookmark(this.myUser.id, questionId, flag)
        .subscribe((data: AppUser) => this.retBookmarkUser = data, 
          error => console.log(error), 
        () => console.log('Bookmark updated'));

  }
}
