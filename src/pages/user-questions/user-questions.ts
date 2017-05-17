import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Configuration } from '../../app/app.constants';
import { QuestionServicev2 } from '../../shared/app.questionservicev2';
import { DataService } from '../../shared/app.dataservice';
import { QuestionService } from '../../shared/app.questionservice';
import { Question } from '../../models/app.question';
import { AppUser } from '../../models/app.user';
import { AnswersToTheQuestionPage } from '../answers-to-the-question/answers-to-the-question';
import { TopicQuestionsPage } from '../topic-questions/topic-questions';
import { PopoverPage } from '../popover/popover';

@Component({
  selector: 'page-user-questions',
  templateUrl: 'user-questions.html'
})
export class UserQuestionsPage {
  
  public userId : string;
  public retQuestions : Question[];
  public retIncQuestion: Question;
  public retBookmarkUser: AppUser;

  constructor(public navCtrl: NavController, public _conf : Configuration, public _questionSeervicev2 : QuestionServicev2, 
                public navParams: NavParams, public _questionService: QuestionService, public popoverCtrl: PopoverController, 
                public _dataService: DataService) {
                    this.userId = this.navParams.get("userId");
                    this.getQuestionsAskedByUser();
                }

  getQuestionsAskedByUser(): void{
    this._questionSeervicev2
            .questionsAskedByUser(this.userId)
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
    this.incrementLikesOfQuestion(question, this.userId);
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

    this.incrementLikesOfQuestion(question, this.userId);

  }
    public incrementLikesOfQuestion(question: Question, userId: string){
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

  public bookmarkQuestionService(questionId: string, flag: boolean){
    this._dataService.updateBookmark(this.userId, questionId, flag)
        .subscribe((data: AppUser) => this.retBookmarkUser = data, 
          error => console.log(error), 
        () => console.log('Bookmark updated'));

  }

}
