import { Component, ViewChild} from '@angular/core';

import { NavController, PopoverController, Content, NavParams } from 'ionic-angular';

import { QuestionService } from '../../shared/app.questionservice';
import { QuestionServicev2 } from '../../shared/app.questionservicev2';
import { QuestionServicev3 } from '../../shared/app.questionservicev3';
import { Question } from '../../models/app.question';
import { AppUser } from '../../models/app.user';
import { UserInfoPage } from '../user-info/user-info';
import { Configuration } from '../../app/app.constants';
import { NewQuestionPage } from '../new-question/new-question';
import { AnswersToTheQuestionPage } from '../answers-to-the-question/answers-to-the-question';
import { TopicQuestionsPage } from '../topic-questions/topic-questions';
import { NewAnswerPage } from '../new-answer-page/new-answer-page';
import { AllTopicsPage } from '../all-topics/all-topics';
import { SearchPage } from '../search/search';
import { PopoverPage } from '../popover/popover';
import { UnansweredQuestionsPage } from '../unanswered-questions/unanswered-questions';
import { CategoryQuestionsPage } from '../category-questions/category-questions';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

@ViewChild(Content) content: Content;

public retQuestions : Question[];

public retIncQuestion : Question;

public retMoreQuestions : Question[];

private myUserData : AppUser;

private retTopics : String[];

private page: number;

private size: number = 10;


  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, 
              private _questionService : QuestionService, private _conf : Configuration,
              private _questionSeervicev2 : QuestionServicev2, 
              private _questionServicev3: QuestionServicev3, 
              private navParams: NavParams) {
    //this.myUserData = this._conf.myUser;
    this.myUserData = this.navParams.get("page2User");  
    //console.log(this.myUserData);
    this.page = 0;
    //this.size =20 ;
    this.getAllQuestions();
    this.findAllTopicsTen();  
  }

  refreshPage(): void{    
    this.goToTop();
    this.page = 0;
    this.getAllQuestions();  
    this.findAllTopicsTen();    
  }

  goToTop(): void{
    this.content.scrollToTop();
  }

  presentPopover(myEvent, questionId: string) {
    let popover = this.popoverCtrl.create(PopoverPage, { qId: questionId });
    popover.present({
      ev: myEvent
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.refreshPage();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  loadMore(infiniteScroll): void{    
      this._questionServicev3
            .pagedQuestionsAskedByUser(this.myUserData.id, String(this.page), String(this.size))
            .subscribe((data:Question[]) => this.retMoreQuestions = data,
                error => console.log(error),
                () => {
                  ++this.page;
                  
                  //for(var qu of this.retMoreQuestions){
                    this.retQuestions.push(...this.retMoreQuestions);
                  //}
                  console.log('Async operation has ended');
                  infiniteScroll.complete();
                }
              );    
  }

  private findAllTopicsTen(): void{

    this._questionSeervicev2.findAllTopicsTen()
        .subscribe((data:String[]) => this.retTopics = data, 
          error => console.log(error),
          () => console.log('loaded topics')
        );
  }

  private getAllQuestions() : void{
   
    this._questionServicev3
            .pagedQuestionsAskedByUser(this.myUserData.id, String(this.page), String(this.size))
            .subscribe((data:Question[]) => this.retQuestions = data,
                error => console.log(error),
                () => ++this.page);
  }

  //incrementLikesOfQuestion
  private incrementLikesOfQuestion(question: Question, userId: string){
    this._questionService.incrementLikesOfQuestion(question, userId)
      .subscribe((data:Question) => this.retIncQuestion = data,
                error => console.log(error),
                () => console.log('Updated the question votes in server.'));
  }

  goToUserInfo(theUserId: string) : void{
    this.navCtrl.push( UserInfoPage, { myUserId : theUserId })
  }
  
  toggleAnswers(question : Question) : void{
    question.showAnswersinUI = !question.showAnswersinUI;
  }

  askNewQuestion() : void{
    this.navCtrl.push(NewQuestionPage);
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

  goToAnswersPage(question : Question) : void{
    this.navCtrl.push( AnswersToTheQuestionPage, { question : question });
  }

  goToTopicQuestions(topic: string) : void{
    this.navCtrl.push(TopicQuestionsPage, { topic: topic} );
  }

  goToNewAnswersPage(question: Question): void{    
    this.navCtrl.push(NewAnswerPage, {question: question});
  }

  extractFirstLetter(userName: string){
    return userName.charAt(0);
  }

  goToAllTopicsPage(): void{
    this.navCtrl.push(AllTopicsPage);
  }

  goToUnansweredQuestions(): void{
    this.navCtrl.push(UnansweredQuestionsPage);
  }

  goToSearchPage(): void{
    this.navCtrl.push(SearchPage);
  }

  goToCategoryQuestions(category: string): void{
    this.navCtrl.push(CategoryQuestionsPage, {category: category});
  }


}
