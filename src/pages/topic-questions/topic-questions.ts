import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Configuration } from '../../app/app.constants';
import { Question } from '../../models/app.question'; 
import { QuestionService } from '../../shared/app.questionservice';
import { QuestionServicev2 } from '../../shared/app.questionservicev2';
import { AnswersToTheQuestionPage } from '../answers-to-the-question/answers-to-the-question';
import { UserInfoPage } from '../user-info/user-info';
import { AppUser } from '../../models/app.user';
import { PopoverPage } from '../popover/popover';

@Component({
  selector: 'page-topic-questions',
  templateUrl: 'topic-questions.html'
})
export class TopicQuestionsPage {


  myTopic: string;
  public retIncQuestion : Question;
  private myUserData : AppUser;

  public retQuestions : Question[];

  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams, private _questionService: QuestionService,
            private _conf : Configuration, private _questionservicev2: QuestionServicev2) {
    this.myTopic = this.navParams.get("topic");
    
    this.myUserData = this._conf.myUser;
    this.getAllQuestionsByTopic(this.myTopic, this.myUserData.id);
  }

  getAllQuestionsByTopic(topic: string, userId: string): void{
    this._questionservicev2
            .getAllQuestionsByTopic(topic, userId)
            .subscribe((data:Question[]) => this.retQuestions = data,
                error => console.log(error),
                () => console.log('Loaded questions'));
  }

  presentPopover(myEvent, questionId: string) {
    let popover = this.popoverCtrl.create(PopoverPage, { qId: questionId });
    popover.present({
      ev: myEvent
    });
  }

  ionViewDidLoad() {
    console.log('Hello TopicQuestionsPage Page');
  }

  toggleAnswers(question : Question) : void{
    question.showAnswersinUI = !question.showAnswersinUI;
  }

  goToAnswersPage(question : Question) : void{
    this.navCtrl.push( AnswersToTheQuestionPage, { question : question });
  }

  extractFirstLetter(userName: string){
    return userName.charAt(0);
  }

  goToUserInfo(theUserId: string) : void{
    this.navCtrl.push( UserInfoPage, { myUserId : theUserId })
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

    console.log("This question has " + question.votes + " votes.");

    question.liked = true;
    
    //TODO: Allow like only once. 
    //User shouldn't be able to like multiple times.
    //Also, server should know if a question has already been liked.

    ++question.votes;

    this.incrementLikesOfQuestion(question, this.myUserData.id);

  }

  private incrementLikesOfQuestion(question: Question, userId: string){
    this._questionService.incrementLikesOfQuestion(question, userId)
      .subscribe((data:Question) => this.retIncQuestion = data,
                error => console.log(error),
                () => console.log('Updated the question votes in server.'));
  }

}
